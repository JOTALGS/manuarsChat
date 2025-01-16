import random
import asyncio

async def get_llm_response(user_message: str) -> str:
    """Simulate an LLM response with some delay"""
    # Simulate processing time
    await asyncio.sleep(1)
    
    # Simple response templates
    responses = [
        f"I understand you said: '{user_message}'. Here's my response...",
        "That's an interesting point. Let me think about it...",
        "I would approach this by...",
        "Here's what I think about that...",
    ]
    
    return random.choice(responses)