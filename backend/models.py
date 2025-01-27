from fastapi import WebSocket
from typing import Dict, List, Optional
import time
from sqlalchemy import Column, Integer, Text, String, Float, Boolean, ForeignKey, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker, Session
from passlib.context import CryptContext

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(Float, default=time.time)
    
    chats = relationship("Chat", back_populates="user")

class Chat(Base):
    __tablename__ = "chats"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)

    chat_counter = Column(Integer, nullable=False)
    chat_name = Column(String(255))
    created_at = Column(Float, default=time.time)

    messages = relationship("Message", back_populates="chat")
    user = relationship("User", back_populates="chats")


class Message(Base):
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key=True, index=True)
    chat_id = Column(Integer, ForeignKey("chats.id"), nullable=False)

    content = Column(Text, nullable=False)
    timestamp = Column(Float, default=time.time)
    is_bot = Column(Boolean, default=False)

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
        chat = (
            self.db.query(Chat)
            .filter(Chat.user_id == user_id, Chat.chat_counter == chat_id)
            .first()
        )
        if not chat:
            chat = Chat(chat_counter=chat_id, user_id=user_id, chat_name=chat_name or f"Chat {chat_id}")
            self.db.add(chat)
        elif chat_name:
            chat.chat_name = chat_name

        print(chat)
        self.db.commit()

        message = Message(
            chat_id=chat.id,
            content=content,
            timestamp=time.time(),
            is_bot=is_bot
        )
        self.db.add(message)
        self.db.commit()
        
        return {
            "chat_counter": chat_id,
            "content": content,
            "timestamp": message.timestamp,
            "is_bot": is_bot
        }
    
    async def send_message(self, user_id: int, message: str):
        if user_id in self.active_connections:
            await self.active_connections[user_id].send_text(message)
    
    def get_chat_history(self, user_id: int, chat_id: int) -> Dict:
        chat = (
            self.db.query(Chat)
            .filter(Chat.user_id == user_id, Chat.id == chat_id)
            .first()
        )
        if not chat:
            return {}
        
        messages = [
            {
                "chat_id": msg.chat_id,
                "content": msg.content,
                "timestamp": msg.timestamp,
                "is_bot": msg.is_bot
            }
            for msg in chat.messages
        ]
        
        return {
            "chat_name": chat.chat_name,
            "user_id": chat.user_id,
            "messages": messages
        }
    
    def get_all_chats(self, user_id: int) -> list:
        chats = self.db.query(Chat).filter(Chat.user_id == user_id).all()
        if not chats:
            return {}
        
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

    def set_chat_name(self, user_id: int, chat_id: int, chat_name: str):
        # Find the chat by user_id and chat_id
        chat = (
            self.db.query(Chat)
            .filter(Chat.user_id == user_id, Chat.chat_counter == chat_id)
            .first()
        )
        if not chat:
            # Create a new chat if it doesn't exist
            chat = Chat(chat_counter=chat_id, user_id=user_id, chat_name=chat_name)
            self.db.add(chat)
        else:
            # Update the chat name
            chat.chat_name = chat_name
        self.db.commit()

manager = ConnectionManager()

pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)