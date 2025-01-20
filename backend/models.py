from fastapi import WebSocket
from typing import Dict, List, Optional
import time
from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker, Session
from datetime import datetime

Base = declarative_base()

class Chat(Base):
    __tablename__ = "chats"
    
    id = Column(Integer, primary_key=True, index=True)
    chat_name = Column(String(255))
    created_at = Column(Float, default=time.time)
    
    # Relationship with messages
    messages = relationship("Message", back_populates="chat")


class Message(Base):
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key=True, index=True)
    chat_id = Column(Integer, ForeignKey("chats.id"))
    user_id = Column(Integer)
    content = Column(String(1000))
    timestamp = Column(Float, default=time.time)
    is_bot = Column(Boolean, default=False)
    
    # Relationship with chat
    chat = relationship("Chat", back_populates="messages")

# Database connection
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://madmin:mpassword@localhost/mchat_db"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_size=5,
    max_overflow=10,
    pool_timeout=30,
    pool_recycle=1800
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[int, WebSocket] = {}
        self.db: Session = SessionLocal()

    def __del__(self):
        self.db.close()

    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    def disconnect(self, user_id: int):
        if user_id in self.active_connections:
            del self.active_connections[user_id]

    def save_message(self, user_id: int, chat_id: int, content: str, chat_name: Optional[str] = None, is_bot: bool = False):
        # Get or create chat
        chat = self.db.query(Chat).filter(Chat.id == chat_id).first()
        if not chat:
            chat = Chat(id=chat_id, chat_name=chat_name or f"Chat {chat_id}")
            self.db.add(chat)
        elif chat_name:
            chat.chat_name = chat_name

        # Create and save message
        message = Message(
            chat_id=chat_id,
            user_id=user_id,
            content=content,
            timestamp=time.time(),
            is_bot=is_bot
        )
        self.db.add(message)
        self.db.commit()
        
        return {
            "chat_id": chat_id,
            "user_id": user_id,
            "content": content,
            "timestamp": message.timestamp,
            "is_bot": is_bot
        }
    
    async def send_message(self, user_id: int, message: str):
        if user_id in self.active_connections:
            await self.active_connections[user_id].send_text(message)
    
    def get_chat_history(self, chat_id: int) -> Dict:
        chat = self.db.query(Chat).filter(Chat.id == chat_id).first()
        if not chat:
            return {}
        
        messages = [
            {
                "chat_id": msg.chat_id,
                "user_id": msg.user_id,
                "content": msg.content,
                "timestamp": msg.timestamp,
                "is_bot": msg.is_bot
            }
            for msg in chat.messages
        ]
        
        return {
            "chat_name": chat.chat_name,
            "messages": messages
        }
    
    def get_all_chats(self) -> list:
        chats = self.db.query(Chat).all()
        if not chats:
            return {}
        
        # Create a structured list of chat details
        chat_list = [
            {
                "chat_id": chat.id,
                "chat_name": chat.chat_name
            }
            for chat in chats
        ]
        
        return {
            "chats": chat_list
        }

    def set_chat_name(self, chat_id: int, chat_name: str):
        chat = self.db.query(Chat).filter(Chat.id == chat_id).first()
        if not chat:
            chat = Chat(id=chat_id, chat_name=chat_name)
            self.db.add(chat)
        else:
            chat.chat_name = chat_name
        self.db.commit()

manager = ConnectionManager()