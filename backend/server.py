from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
from routes import router
from models import manager
from llm import get_llm_response


##SERVER CONFIGURATION
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api", tags=["Chats", "Messages"])

##WEBSOCKET CONFIGURATION
@app.websocket("/ws/chat/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: int):
    await manager.connect(websocket, user_id)
    try:
        while True:
            data = await websocket.receive_text()
            try:
                parsed_data = json.loads(data)
            except json.JSONDecodeError:
                print(f"Invalid JSON data received.\nData: {type(data)}\nData: {data}")
                raise WebSocketDisconnect 
            chat_id = parsed_data.get("chat_id")
            user_message = parsed_data.get("message")

            # Save the user's message
            manager.save_message(user_id, chat_id, user_message, is_bot=False)

            # Get LLM response
            llm_response = await get_llm_response(user_message)

            # Save the LLM's response
            manager.save_message(user_id, chat_id, llm_response, is_bot=True)

            # Send the response back to the user
            await manager.send_message(user_id, json.dumps({
                "chat_id": chat_id,
                "message": llm_response,
                "is_bot": True
            }))
    except WebSocketDisconnect:
        manager.disconnect(user_id)
