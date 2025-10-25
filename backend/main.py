"""
FastAPI Main Application
Knowledge Management API Server
"""
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from datetime import datetime
from typing import Optional, List
import os
import tempfile

# Import core modules
from core.config import settings
from core.obsidian import obsidian
from core.ai_processor import ai_processor
from api.models.schemas import (
    CaptureRequest, CaptureResponse,
    ChatRequest, ChatResponse,
    TimelineResponse, NoteItem,
    DashboardResponse, DashboardStats, ProjectSummary, ArticleSummary
)


# Initialize FastAPI app
app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="AI-powered knowledge management API for Obsidian",
    debug=settings.debug
)


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """API root endpoint"""
    return {
        "app": settings.app_name,
        "version": settings.app_version,
        "status": "running",
        "vault": str(settings.full_vault_path),
        "endpoints": {
            "capture": "/api/capture",
            "chat": "/api/chat",
            "timeline": "/api/timeline",
            "dashboard": "/api/dashboard",
            "voice": "/api/voice",
            "docs": "/docs"
        }
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "vault_accessible": settings.full_vault_path.exists()
    }


@app.post("/api/capture", response_model=CaptureResponse)
async def capture_input(request: CaptureRequest):
    """
    Capture user input (text or voice) and save to appropriate location

    This endpoint:
    1. Uses AI to classify the input
    2. Determines the best storage location
    3. Creates a properly formatted note
    4. Returns confirmation with file location
    """
    try:
        # Classify the input using AI
        classification = ai_processor.classify_input(
            content=request.content,
            context={"timestamp": datetime.now().isoformat()}
        )

        if not classification.get("success"):
            # Fallback if AI classification fails
            classification = {
                "category": "note",
                "title": request.content[:50],
                "target_folder": settings.ideas_path,
                "suggested_tags": []
            }

        # Determine target folder based on category
        category = classification.get("category", "note")
        folder_map = {
            "work_log": settings.daily_logs_path,
            "idea": settings.ideas_path,
            "task": settings.tasks_path,
            "project_update": settings.projects_path,
            "article": settings.writing_path,
        }

        target_folder = folder_map.get(category, settings.ideas_path)

        # Prepare metadata
        metadata = {
            "type": category,
            "tags": classification.get("suggested_tags", []),
            "ai_confidence": classification.get("confidence", 0),
            "input_type": request.input_type
        }

        if request.metadata:
            metadata.update(request.metadata)

        # Create the note
        result = obsidian.create_note(
            content=request.content,
            title=classification.get("title", request.content[:50]),
            folder=target_folder,
            metadata=metadata
        )

        return CaptureResponse(
            success=True,
            message=f"✅ 已保存到 {category}",
            file_path=result["file_path"],
            classification=classification
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/chat", response_model=ChatResponse)
async def chat_with_vault(request: ChatRequest):
    """
    Chat interface for interacting with the knowledge base

    The AI can:
    - Answer questions about your notes
    - Help you capture new information
    - Provide insights and suggestions
    """
    try:
        # Convert Pydantic models to dict for AI processor
        history = [
            {"role": msg.role, "content": msg.content}
            for msg in request.conversation_history
        ]

        # Get vault context if requested
        vault_context = None
        if request.include_context:
            # Get recent notes for context
            recent_notes = obsidian.list_notes(limit=10)
            vault_context = "最近的笔记:\n" + "\n".join([
                f"- {note['title']}" for note in recent_notes[:5]
            ])

        # Generate response
        response_text = ai_processor.chat_response(
            message=request.message,
            conversation_history=history,
            vault_context=vault_context
        )

        return ChatResponse(
            response=response_text,
            suggested_actions=None  # TODO: Implement suggested actions
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/timeline", response_model=TimelineResponse)
async def get_timeline(
    folder: Optional[str] = None,
    limit: int = 50,
    filter: Optional[str] = None
):
    """
    Get timeline of notes

    Args:
        folder: Filter by folder (optional)
        limit: Maximum number of items
        filter: Time filter: today, week, month (optional)
    """
    try:
        # Apply time filter if specified
        if filter == "today":
            # Only get today's notes
            today = datetime.now().strftime("%Y-%m-%d")
            notes = obsidian.list_notes(folder=folder, limit=limit * 2)
            notes = [n for n in notes if n.get("created", "").startswith(today)]
        else:
            notes = obsidian.list_notes(folder=folder, limit=limit)

        # Convert to response model
        items = [NoteItem(**note) for note in notes[:limit]]

        return TimelineResponse(
            items=items,
            total=len(items),
            has_more=len(notes) > limit
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/dashboard", response_model=DashboardResponse)
async def get_dashboard():
    """
    Get dashboard data including stats, active projects, and recent items
    """
    try:
        # Get today's statistics
        today = datetime.now().strftime("%Y-%m-%d")
        today_notes = obsidian.list_notes(limit=1000)
        today_entries = [n for n in today_notes if n.get("created", "").startswith(today)]

        # Get week statistics
        week_entries = today_notes[:50]  # Simplified

        # Get active projects
        projects_notes = obsidian.list_notes(folder=settings.projects_path, limit=20)
        active_projects = []
        for note in projects_notes:
            if note.get("metadata", {}).get("status") != "completed":
                active_projects.append(ProjectSummary(
                    name=note["title"],
                    status=note.get("metadata", {}).get("status", "active"),
                    progress=note.get("metadata", {}).get("progress", 0),
                    last_update=note.get("modified"),
                    folder_path=note["file_path"]
                ))

        # Get active writing
        writing_notes = obsidian.list_notes(folder=settings.writing_path, limit=10)
        active_articles = []
        for note in writing_notes:
            active_articles.append(ArticleSummary(
                title=note["title"],
                word_count=len(note.get("preview", "")),
                status=note.get("metadata", {}).get("status", "draft"),
                last_update=note.get("modified"),
                folder_path=note["file_path"]
            ))

        # Get today's daily log
        daily_log = obsidian.get_daily_log()

        # Compile statistics
        stats = DashboardStats(
            today_entries=len(today_entries),
            today_work_time=0.0,  # TODO: Calculate from logs
            active_projects=len(active_projects),
            active_articles=len(active_articles),
            week_entries=len(week_entries)
        )

        # Recent items
        recent_items = [NoteItem(**note) for note in today_notes[:10]]

        return DashboardResponse(
            stats=stats,
            daily_log=daily_log,
            active_projects=active_projects[:5],
            active_articles=active_articles[:5],
            recent_items=recent_items
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/voice")
async def transcribe_voice(audio: UploadFile = File(...)):
    """
    Transcribe voice input to text using Whisper API

    Accepts audio file and returns transcribed text
    """
    try:
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_file:
            content = await audio.read()
            temp_file.write(content)
            temp_path = temp_file.name

        # Transcribe using Whisper
        result = ai_processor.transcribe_audio(temp_path)

        # Clean up temp file
        os.unlink(temp_path)

        if not result["success"]:
            raise HTTPException(status_code=500, detail=result["error"])

        return {
            "success": True,
            "text": result["text"]
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/projects")
async def get_active_projects():
    """Get list of active projects"""
    try:
        projects = obsidian.list_notes(folder=settings.projects_path, limit=50)
        return {"projects": projects}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/articles")
async def get_active_articles():
    """Get list of articles in progress"""
    try:
        articles = obsidian.list_notes(folder=settings.writing_path, limit=50)
        return {"articles": articles}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Error handlers
@app.exception_handler(404)
async def not_found_handler(request, exc):
    return JSONResponse(
        status_code=404,
        content={"message": "Endpoint not found", "path": str(request.url)}
    )


@app.exception_handler(500)
async def internal_error_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal server error", "detail": str(exc)}
    )


# Startup event
@app.on_event("startup")
async def startup_event():
    """Run on application startup"""
    print("\n" + "=" * 60)
    print(f"🚀 {settings.app_name} v{settings.app_version}")
    print("=" * 60)
    print(f"📁 Vault: {settings.full_vault_path}")
    print(f"🤖 AI Model: {settings.openai_model}")
    print(f"🌐 Server: http://{settings.host}:{settings.port}")
    print(f"📚 API Docs: http://{settings.host}:{settings.port}/docs")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug
    )
