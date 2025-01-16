import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Paper } from '@mui/material';
import { initializeWebSocket } from '../utils/websocket';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setInputMessage } from '../utils/actions';

const Chat = ({ userId }) => {
  const dispatch = useDispatch();
  const { messages, inputMessage, currentRoom } = useSelector((state) => state);
  const [ws, setWs] = useState(null);
  
  useEffect(() => {
    const socketUrl = `ws://127.0.0.1:8000/ws/chat/${userId}`;
    const socket = initializeWebSocket(socketUrl, (message) => {
      const parsedMessage = JSON.parse(message);
      dispatch(addMessage(parsedMessage.message));
    });

    setWs(socket);

    return () => socket.close();
  }, [dispatch]);

  const sendMessage = () => {
    if (currentRoom && inputMessage.trim()) {
      const messageData = {
        chat_id: 1,
        message: inputMessage.trim(),
      };
      
      dispatch(sendMessageToRoom(currentRoom, JSON.stringify(messageData)));
      dispatch(addMessage(inputMessage.trim()));
      dispatch(setInputMessage(''));
    }
    else if (ws && inputMessage.trim()) {
      const messageData = {
        chat_id: 1,
        message: inputMessage.trim(),
      };
      
      ws.send(JSON.stringify(messageData));
      dispatch(addMessage(inputMessage.trim()));
      dispatch(setInputMessage(''));
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="100vh"
      bgcolor="#f0f0f0"
    >
      <h3>Current Chat: {currentRoom}</h3>
      <Paper elevation={3} style={{ padding: '16px', overflowY: 'auto', height: '65%', width: '50%' }}>
        {messages.map((msg, index) => (
          <Box key={index} style={{ marginBottom: '8px' }}>
            {msg}
          </Box>
        ))}
      </Paper>

      <Box display="flex" mt={2}>
        <TextField
          label="Type a message"
          variant="outlined"
          fullWidth
          value={inputMessage}
          onChange={(e) => dispatch(setInputMessage(e.target.value))}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
          style={{ marginLeft: '8px' }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
