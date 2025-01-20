from fastapi import APIRouter, HTTPException
from typing import List, Dict
from models import manager

router = APIRouter()

@router.get("/chats/{chat_id}/history")
async def get_chat_history(chat_id: int) -> Dict:
    """Get the message history for a specific chat"""
    return manager.get_chat_history(chat_id)

@router.get("/chats")
async def get_all_chats() -> Dict:
    """Get all available chat IDs"""
    return manager.get_all_chats()