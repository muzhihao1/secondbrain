"""
OpenAI GPT-4 Integration for intelligent processing
"""
from openai import OpenAI
from typing import Dict, Any, List, Optional
from .config import settings
import json


class AIProcessor:
    """Handles all OpenAI API interactions"""

    def __init__(self):
        self.client = OpenAI(api_key=settings.openai_api_key)
        self.model = settings.openai_model
        self.temperature = settings.openai_temperature

    def classify_input(self, content: str, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Classify user input into categories and extract intent

        Args:
            content: The user's input text
            context: Optional context (current time, recent notes, etc.)

        Returns:
            Dict with classification results
        """
        system_prompt = """你是一个智能知识管理助理。你的任务是分析用户输入并分类。

可能的分类:
- work_log: 工作日志、完成的任务、进展更新
- idea: 想法、灵感、创意
- task: 待办事项、需要完成的任务
- reflection: 反思、总结、回顾
- article: 文章草稿、写作内容
- project_update: 项目进度更新
- question: 问题或查询
- note: 一般笔记

请以JSON格式返回分析结果，包含:
{
  "category": "分类名称",
  "confidence": 0.95,
  "title": "为这条记录生成一个简短标题",
  "suggested_tags": ["标签1", "标签2"],
  "target_folder": "建议的存储文件夹",
  "summary": "简短总结"
}
"""

        user_prompt = f"用户输入: {content}"
        if context:
            user_prompt += f"\n\n上下文: {json.dumps(context, ensure_ascii=False)}"

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=self.temperature,
                response_format={"type": "json_object"}
            )

            result = json.loads(response.choices[0].message.content)
            return {
                "success": True,
                **result
            }

        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "category": "note",  # fallback
                "confidence": 0.5,
                "title": content[:50],
                "suggested_tags": [],
                "target_folder": "01_Execution/Daily_Operations/Ideas"
            }

    def chat_response(self, message: str, conversation_history: List[Dict[str, str]], vault_context: Optional[str] = None) -> str:
        """
        Generate a chat response based on conversation history

        Args:
            message: User's current message
            conversation_history: Previous messages in format [{"role": "user/assistant", "content": "..."}]
            vault_context: Optional context from the knowledge base

        Returns:
            AI's response string
        """
        system_prompt = """你是一个友好的知识管理AI助理。你帮助用户管理他们的Obsidian知识库。

你的能力包括:
- 记录和分类信息
- 回答关于知识库内容的问题
- 提供建议和洞察
- 帮助用户反思和规划

请用简洁、友好的语气回复。如果用户想记录内容，确认你理解了他们的意图。
"""

        if vault_context:
            system_prompt += f"\n\n相关知识库内容:\n{vault_context}"

        messages = [{"role": "system", "content": system_prompt}]
        messages.extend(conversation_history)
        messages.append({"role": "user", "content": message})

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=self.temperature
            )

            return response.choices[0].message.content

        except Exception as e:
            return f"抱歉，我遇到了一些问题: {str(e)}"

    def summarize_text(self, text: str, max_length: int = 200) -> str:
        """
        Generate a summary of the given text

        Args:
            text: Text to summarize
            max_length: Maximum length of summary

        Returns:
            Summary string
        """
        prompt = f"请用{max_length}字以内总结以下内容:\n\n{text}"

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "你是一个擅长总结的助理。"},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3
            )

            return response.choices[0].message.content

        except Exception as e:
            return text[:max_length] + "..."

    def suggest_related_notes(self, current_note_content: str, all_notes_titles: List[str]) -> List[str]:
        """
        Suggest related notes based on content

        Args:
            current_note_content: Content of the current note
            all_notes_titles: List of all note titles in the vault

        Returns:
            List of suggested note titles
        """
        if len(all_notes_titles) < 2:
            return []

        prompt = f"""基于以下笔记内容，从给定的标题列表中选择最相关的3-5篇笔记。

当前笔记内容:
{current_note_content[:500]}

可用的笔记标题:
{json.dumps(all_notes_titles[:100], ensure_ascii=False)}

请返回JSON格式: {{"related_notes": ["标题1", "标题2", ...]}}
"""

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "你是一个知识关联专家。"},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.5,
                response_format={"type": "json_object"}
            )

            result = json.loads(response.choices[0].message.content)
            return result.get("related_notes", [])

        except Exception as e:
            print(f"Error suggesting related notes: {e}")
            return []

    def transcribe_audio(self, audio_file_path: str) -> Dict[str, Any]:
        """
        Transcribe audio file to text using Whisper API

        Args:
            audio_file_path: Path to audio file

        Returns:
            Dict with transcription result
        """
        try:
            with open(audio_file_path, "rb") as audio_file:
                transcript = self.client.audio.transcriptions.create(
                    model="whisper-1",
                    file=audio_file,
                    response_format="json"
                )

            return {
                "success": True,
                "text": transcript.text
            }

        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "text": ""
            }


# Global instance
ai_processor = AIProcessor()
