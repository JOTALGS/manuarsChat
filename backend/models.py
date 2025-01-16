from fastapi import WebSocket
from typing import Dict, List, Optional
import time

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}
        self.chat_history: Dict[int, List[Dict]][str, str] = {}  # chat_id -> messages
    
    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        self.active_connections[user_id] = websocket
    
    def disconnect(self, user_id: int):
        if user_id in self.active_connections:
            del self.active_connections[user_id]
    
    def save_message(self, user_id: int, chat_id: int, content: str, chat_name: Optional[str] = None, is_bot: bool = False):
        if chat_id not in self.chat_history:
            self.chat_history[chat_id] = {
                "chat_name": chat_name or f"Chat {chat_id}",
                "messages": []
            }
        elif chat_name:
            self.chat_history[chat_id]["chat_name"] = chat_name
        
        message = {
            "chat_id": chat_id,
            "user_id": user_id,
            "content": content,
            "timestamp": time.time(),
            "is_bot": is_bot
        }
        self.chat_history[chat_id]["messages"].append(message)
        return message
    
    async def send_message(self, user_id: int, message: str):
        if user_id in self.active_connections:
            await self.active_connections[user_id].send_text(message)
    
    def get_chat_history(self, chat_id: int) -> Dict:
        return self.chat_history.get(chat_id, {})
    
    def set_chat_name(self, chat_id: int, chat_name: str):
        if chat_id in self.chat_history:
            self.chat_history[chat_id]["chat_name"] = chat_name
        else:
            # Initialize the chat if it doesn't exist
            self.chat_history[chat_id] = {
                "chat_name": chat_name,
                "messages": []
            }

manager = ConnectionManager()