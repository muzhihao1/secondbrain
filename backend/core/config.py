"""
Configuration management for the Knowledge Management API
"""
import os
from pathlib import Path
from typing import Optional, Union
from pydantic_settings import BaseSettings
from pydantic import Field, field_validator


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""

    # API Configuration
    app_name: str = "Knowledge Management API"
    app_version: str = "1.0.0"
    debug: bool = Field(default=False, validation_alias="DEBUG")

    # Server Configuration
    host: str = Field(default="0.0.0.0", validation_alias="BACKEND_HOST")
    port: int = Field(default=8000, validation_alias="BACKEND_PORT")

    # CORS
    cors_origins: Union[list[str], str] = Field(
        default=["http://localhost:5173", "http://127.0.0.1:5173"],
        validation_alias="CORS_ORIGINS"
    )

    @field_validator('cors_origins', mode='before')
    @classmethod
    def parse_cors_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(',')]
        return v

    # OpenAI Configuration
    openai_api_key: str = Field(validation_alias="OPENAI_API_KEY")
    openai_model: str = Field(default="gpt-4-turbo-preview", validation_alias="OPENAI_MODEL")
    openai_temperature: float = Field(default=0.7, validation_alias="OPENAI_TEMPERATURE")

    # Obsidian Vault Configuration
    vault_path: Path = Field(validation_alias="OBSIDIAN_VAULT_PATH")

    # Vault Structure Paths (relative to vault_path)
    intelligence_path: str = "02_Intelligence"
    foundation_path: str = "00_Foundation"
    execution_path: str = "01_Execution"

    # Daily Operations Paths
    daily_logs_path: str = "01_Execution/Daily_Operations/Logs"
    ideas_path: str = "01_Execution/Daily_Operations/Ideas"
    tasks_path: str = "01_Execution/Daily_Operations/Tasks"

    # Projects and Writing
    projects_path: str = "01_Execution/Projects"
    writing_path: str = "01_Execution/Writing"

    # Workflows
    workflows_file: str = "00_Foundation/Templates/WORKFLOWS.md"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False

    @property
    def full_vault_path(self) -> Path:
        """Get the full path to the Obsidian vault"""
        return Path(self.vault_path).expanduser().resolve()

    def get_full_path(self, relative_path: str) -> Path:
        """Get full path for a relative vault path"""
        return self.full_vault_path / relative_path

    def ensure_path_exists(self, relative_path: str) -> Path:
        """Ensure a path exists within the vault, create if not"""
        full_path = self.get_full_path(relative_path)
        full_path.mkdir(parents=True, exist_ok=True)
        return full_path


# Global settings instance
settings = Settings()


# Verify vault path exists
if not settings.full_vault_path.exists():
    raise ValueError(
        f"Obsidian vault path does not exist: {settings.full_vault_path}\n"
        f"Please set OBSIDIAN_VAULT_PATH in your .env file"
    )


# Verify OpenAI API key
if not settings.openai_api_key or settings.openai_api_key.startswith("sk-..."):
    raise ValueError(
        "OpenAI API key not configured.\n"
        "Please set OPENAI_API_KEY in your .env file"
    )


print(f"✅ Configuration loaded successfully")
print(f"📁 Vault path: {settings.full_vault_path}")
print(f"🤖 OpenAI model: {settings.openai_model}")
