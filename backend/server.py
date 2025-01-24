from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import json
from routes import router
from models import manager
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api", tags=["Chats", "Messages"])

# WebSocket Configuration
API_KEY = os.getenv("API_KEY")
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

chat = model.start_chat(history=[])

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

            if not chat_id or not user_message:
                print(f"Missing chat_id or message in received data: {parsed_data}")
                raise WebSocketDisconnect

            manager.save_message(user_id, chat_id, user_message, is_bot=False)

            try:
                llm_response = chat.send_message(str(user_message), stream=True)
            except Exception as e:
                print(f"Error while getting response from Gemini: {e}")
                llm_response = "Unable to generate a response."

            response_text = ""

            for chunk in llm_response:
                response_text += chunk.text
            print(f"LLM Response: {response_text}")
            manager.save_message(user_id, chat_id, response_text, is_bot=True)

            await manager.send_message(user_id, json.dumps({
                "chat_id": chat_id,
                "message": response_text,
                "is_bot": True
            }))
    except WebSocketDisconnect:
        manager.disconnect(user_id)
