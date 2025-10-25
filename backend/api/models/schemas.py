"""
Pydantic schemas for API request/response models
"""
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime


class CaptureRequest(BaseModel):
    """Request model for capturing user input"""
    content: str = Field(..., description="The content to capture")
    input_type: str = Field(default="text", description="Input type: text or voice")
    metadata: Optional[Dict[str, Any]] = Field(default=None, description="Additional metadata")


class CaptureResponse(BaseModel):
    """Response model for capture operations"""
    success: bool
    message: str
    file_path: Optional[str] = None
    classification: Optional[Dict[str, Any]] = None


class ChatMessage(BaseModel):
    """Single chat message"""
    role: str = Field(..., description="Role: user or assistant")
    content: str
    timestamp: Optional[datetime] = None


class ChatRequest(BaseModel):
    """Request model for chat interactions"""
    message: str
    conversation_history: List[ChatMessage] = Field(default_factory=list)
    include_context: bool = Field(default=True, description="Whether to include vault context")


class ChatResponse(BaseModel):
    """Response model for chat"""
    response: str
    suggested_actions: Optional[List[Dict[str, str]]] = None


class NoteItem(BaseModel):
    """Single note in timeline"""
    file_path: str
    title: str
    preview: str
    created: Optional[str] = None
    modified: Optional[str] = None
    tags: List[str] = Field(default_factory=list)
    metadata: Dict[str, Any] = Field(default_factory=dict)


class TimelineResponse(BaseModel):
    """Response model for timeline"""
    items: List[NoteItem]
    total: int
    has_more: bool


class DashboardStats(BaseModel):
    """Dashboard statistics"""
    today_entries: int
    today_work_time: float  # hours
    active_projects: int
    active_articles: int
    week_entries: int


class ProjectSummary(BaseModel):
    """Project summary for quick view"""
    name: str
    status: str
    progress: float  # 0-100
    last_update: Optional[str] = None
    folder_path: str


class ArticleSummary(BaseModel):
    """Writing article summary"""
    title: str
    word_count: int
    status: str  # draft, in-progress, completed
    last_update: Optional[str] = None
    folder_path: str


class DashboardResponse(BaseModel):
    """Complete dashboard data"""
    stats: DashboardStats
    daily_log: Optional[Dict[str, Any]] = None
    active_projects: List[ProjectSummary]
    active_articles: List[ArticleSummary]
    recent_items: List[NoteItem]
