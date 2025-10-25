"""
Obsidian vault file operations
Handles reading and writing Markdown files with YAML frontmatter
"""
import frontmatter
from pathlib import Path
from datetime import datetime
from typing import Optional, Dict, Any, List
from .config import settings


class ObsidianManager:
    """Manages operations on the Obsidian vault"""

    def __init__(self):
        self.vault_path = settings.full_vault_path

    def create_note(
        self,
        content: str,
        title: str,
        folder: str,
        metadata: Optional[Dict[str, Any]] = None,
        filename: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Create a new note in the Obsidian vault

        Args:
            content: The main content of the note
            title: The title of the note
            folder: Folder path relative to vault root
            metadata: Additional metadata for frontmatter
            filename: Optional custom filename (without .md extension)

        Returns:
            Dict with file_path, title, and success status
        """
        # Generate filename if not provided
        if not filename:
            date_prefix = datetime.now().strftime("%Y-%m-%d")
            safe_title = self._sanitize_filename(title)
            filename = f"{date_prefix}_{safe_title}"

        # Ensure folder exists
        folder_path = settings.ensure_path_exists(folder)

        # Create full file path
        file_path = folder_path / f"{filename}.md"

        # Prepare frontmatter
        front = metadata or {}
        front.update({
            "title": title,
            "created": datetime.now().isoformat(),
            "modified": datetime.now().isoformat(),
        })

        # Create post with frontmatter
        post = frontmatter.Post(content, **front)

        # Write to file
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(frontmatter.dumps(post))

        return {
            "success": True,
            "file_path": str(file_path.relative_to(self.vault_path)),
            "absolute_path": str(file_path),
            "title": title,
            "filename": f"{filename}.md"
        }

    def read_note(self, file_path: str) -> Dict[str, Any]:
        """
        Read a note from the vault

        Args:
            file_path: Path relative to vault root

        Returns:
            Dict with content and metadata
        """
        full_path = self.vault_path / file_path

        if not full_path.exists():
            raise FileNotFoundError(f"Note not found: {file_path}")

        with open(full_path, "r", encoding="utf-8") as f:
            post = frontmatter.load(f)

        return {
            "content": post.content,
            "metadata": post.metadata,
            "title": post.metadata.get("title", full_path.stem),
            "file_path": file_path
        }

    def update_note(self, file_path: str, content: Optional[str] = None, metadata: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Update an existing note

        Args:
            file_path: Path relative to vault root
            content: New content (None to keep existing)
            metadata: Metadata to update (merged with existing)

        Returns:
            Dict with success status
        """
        full_path = self.vault_path / file_path

        if not full_path.exists():
            raise FileNotFoundError(f"Note not found: {file_path}")

        # Read existing note
        with open(full_path, "r", encoding="utf-8") as f:
            post = frontmatter.load(f)

        # Update content if provided
        if content is not None:
            post.content = content

        # Update metadata if provided
        if metadata:
            post.metadata.update(metadata)

        # Update modified timestamp
        post.metadata["modified"] = datetime.now().isoformat()

        # Write back
        with open(full_path, "w", encoding="utf-8") as f:
            f.write(frontmatter.dumps(post))

        return {
            "success": True,
            "file_path": file_path,
            "message": "Note updated successfully"
        }

    def list_notes(
        self,
        folder: Optional[str] = None,
        limit: Optional[int] = 50,
        sort_by: str = "modified"
    ) -> List[Dict[str, Any]]:
        """
        List notes from the vault

        Args:
            folder: Folder path relative to vault root (None for all)
            limit: Maximum number of notes to return
            sort_by: Sort by "modified" or "created"

        Returns:
            List of note summaries
        """
        search_path = self.vault_path if folder is None else self.vault_path / folder

        if not search_path.exists():
            return []

        notes = []
        for md_file in search_path.rglob("*.md"):
            try:
                with open(md_file, "r", encoding="utf-8") as f:
                    post = frontmatter.load(f)

                # Extract preview (first 200 chars of content)
                preview = post.content[:200].strip()
                if len(post.content) > 200:
                    preview += "..."

                notes.append({
                    "file_path": str(md_file.relative_to(self.vault_path)),
                    "title": post.metadata.get("title", md_file.stem),
                    "preview": preview,
                    "created": post.metadata.get("created"),
                    "modified": post.metadata.get("modified"),
                    "tags": post.metadata.get("tags", []),
                    "metadata": post.metadata
                })
            except Exception as e:
                # Skip files that can't be read
                print(f"Warning: Could not read {md_file}: {e}")
                continue

        # Sort notes (handle None values safely)
        if sort_by == "modified":
            notes.sort(key=lambda x: x.get("modified") or "", reverse=True)
        elif sort_by == "created":
            notes.sort(key=lambda x: x.get("created") or "", reverse=True)

        # Limit results
        if limit:
            notes = notes[:limit]

        return notes

    def get_daily_log(self, date: Optional[datetime] = None) -> Dict[str, Any]:
        """
        Get or create today's daily log

        Args:
            date: The date for the log (defaults to today)

        Returns:
            Dict with log content and metadata
        """
        if date is None:
            date = datetime.now()

        date_str = date.strftime("%Y-%m-%d")
        year = date.strftime("%Y")
        filename = f"{date_str}_daily_log"

        # Path: 01_Execution/Logs/Journal_Entries/YYYY/
        log_folder = f"01_Execution/Logs/Journal_Entries/{year}"
        folder_path = settings.ensure_path_exists(log_folder)
        file_path = folder_path / f"{filename}.md"

        # Check if log exists
        if file_path.exists():
            with open(file_path, "r", encoding="utf-8") as f:
                post = frontmatter.load(f)
            return {
                "exists": True,
                "content": post.content,
                "metadata": post.metadata,
                "file_path": str(file_path.relative_to(self.vault_path))
            }

        # Create new log
        template = f"""# Daily Log - {date_str}

## 🎯 Today's Focus

## 📝 Work Log

## 💭 Thoughts and Ideas

## 📊 Summary
"""

        result = self.create_note(
            content=template,
            title=f"Daily Log - {date_str}",
            folder=log_folder,
            filename=filename,
            metadata={
                "type": "daily_log",
                "date": date_str,
                "tags": ["daily-log", year]
            }
        )

        return {
            "exists": False,
            "content": template,
            "metadata": {"type": "daily_log", "date": date_str},
            "file_path": result["file_path"]
        }

    @staticmethod
    def _sanitize_filename(filename: str) -> str:
        """Sanitize filename by removing invalid characters"""
        invalid_chars = '<>:"/\\|?*'
        for char in invalid_chars:
            filename = filename.replace(char, "")
        # Limit length and replace spaces
        filename = filename[:100].strip().replace(" ", "-").lower()
        return filename


# Global instance
obsidian = ObsidianManager()
