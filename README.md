# manuarsChat

# Full-Stack Chat Application

## Overview

This project is a full-stack chat application designed to showcase the development of a scalable, real-time messaging platform. The application includes frontend built with React.js, and backend with Python (FastAPI), and integration with external APIs for enhanced functionality. The system supports persistent chat history, real-time messaging, and a clean, user-friendly interface.

## Table of Contents

1. [Features](#Features)
2. [Setup Instructions](#setup-instructions)
3. [API Documentation](#api-documentation)

## Features

### Frontend
- **Framework:** React.js with Material-UI.
- **Real-Time Messaging:** WebSockets enable instant message delivery and updates.
- **State Management:** Redux efficiently manage chat state and user interactions.

### Backend
- **Framework:** FastAPI Python framework.
- **Database:** MySQL Database.
- **API Endpoints:** Provides RESTful APIs for sending messages, retrieving chat history, and managing chat sessions.
- **Real-Time Communication:** WebSockets ensure real-time comunication between the user and the server.

### External Integration
- **Large Language Model Integration:** Connects Gemini APIs to generate intelligent and context-aware responses.

### Extras
- **User Authentication:** Implements JWT secure user access and data segregation.
- **Deployment:** Deploys the application to Google Cloud Platform.


## Setup Instructions

### Prerequisites

- Node.js and npm (for frontend)
- Python 3.8+ (for backend)
- MySQL (for database)
- Gemini API key (for AI integration)

### Frontend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JOTALGS/manuarsChat.git
   cd manuarsChat/frontend

2. **Install dependencies:**
   ```bash
   npm install

3. **Start the development server:**
   ```bash
   npm start


### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd manuarsChat/backend
   
2. **Create a virtual environment and activate it:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt

## API Documentation

### CHATS
- **Endpoint**: `GET /api/chats/2`
- **Description**: Retrieves information about chat with ID 2.
- **URL**: [https://manuarsclo.duckdns.org/api/chats/2](https://manuarsclo.duckdns.org/api/chats/2)
- **Authentication**: None required.

---

### HISTORY
- **Endpoint**: `GET /api/chats/1/2/history`
- **Description**: Retrieves the chat history of user's 1 chat 2.
- **URL**: [https://manuarsclo.duckdns.org/api/chats/1/2/history](https://manuarsclo.duckdns.org/api/chats/1/2/history)
- **Authentication**: None required.

---

### SIGNUP
- **Endpoint**: `POST /api/users`
- **Description**: Registers a new user.
- **URL**: [https://manuarsclo.duckdns.org/api/users](https://manuarsclo.duckdns.org/api/users)
- **Authentication**: None required.
- **Request Body (JSON)**:
  ```json
  {
      "username": "ws3",
      "email": "thremail@example.com",
      "password": "123456789"
  }

---

### ME
Retrieves information about the currently authenticated user.

- **Method:** `GET`
- **URL:** `https://manuarsclo.duckdns.org/api/users/me`
- **Authentication:** Bearer Token
- **Headers:**
  ```makefile
  Authorization: Bearer <token>

---

### LOGIN
Authenticates a user and provides a token.

- **Method:** `POST`
- **URL:** `https://manuarsclo.duckdns.org/api/login`
- **Authentication:** None required.
- **Request Body (JSON):**
  ```json
  {
      "username": "ws3",
      "password": "123456789"
  }

---
