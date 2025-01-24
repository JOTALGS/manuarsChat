import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, Paper, Slide } from '@mui/material';
import { initializeWebSocket } from '../utils/websocket';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setInputMessage } from '../utils/actions';
import Avatar from '@mui/material/Avatar';
import avat from '../assets/avatar.png';
import user from '../assets/user.png';
import backgroundImage from '../assets/bgbot.png';
import chatBackgroundImage from '../assets/chatbg.png';
import zIndex from '@mui/material/styles/zIndex';

const Chat = ({ userId, chatId, history }) => {
  const dispatch = useDispatch();
  const { messages, inputMessage, currentRoom } = useSelector((state) => state);
  const [ws, setWs] = useState(null);
  const displayMessages = history ? history.messages : messages;
  const chatName = history ? history.chat_name : "New Chat";
  const apiUrl = import.meta.env.VITE_PROD_URL;
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [displayMessages]);

  useEffect(() => {
    const socketUrl = `wss://${apiUrl}/ws/chat/${userId}`;
    const socket = initializeWebSocket(socketUrl, (message) => {
      const parsedMessage = JSON.parse(message);
      dispatch(addMessage({"chat_id": chatId, "user_id": userId, "content": parsedMessage.message, is_bot: true}));
    });

    setWs(socket);

    return () => socket.close();
  }, [dispatch]);

  const sendMessage = () => {
    if (ws && inputMessage.trim()) {
      const messageData = {
        chat_id: chatId,
        message: inputMessage.trim(),
      };
      
      ws.send(JSON.stringify(messageData));
      dispatch(addMessage({"chat_id": chatId, "user_id": userId, "content": inputMessage.trim(), is_bot: false}));
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
      bgcolor="#f5bfab"
    >
      <img
        src={backgroundImage}
        alt="Background"
        style={{
          position: 'absolute',
          top: '0px',
          right: '0px',
          width: '180px',
          height: '180px',
          zIndex: 0,
        }}
      />
      <h2 style={{ color: '#d40659', fontSize: '35px', fontFamily: '"Jersey 10", sans-serif' }}>Current Chat: {chatName}</h2>
      <Paper ref={messagesEndRef} elevation={3} style={{ padding: '16px', overflowY: 'auto', height: '70%', width: '85%', position: 'relative', zIndex: 1000, backgroundColor: '#ffefe8' }}>
        {displayMessages.map((msg, index) => (
          <Slide
            key={index}
            direction="up" // Slide direction
            in={true} // Control the visibility of the transition
            mountOnEnter
            unmountOnExit
          >
          <Box
            key={index}
            style={{
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: '16px',
              paddingRight: '16px',
              justifyContent: msg.is_bot ? 'flex-start' : 'flex-end',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '8px',
                borderRadius: '4px',
                width: 'fit-content',
                maxWidth: '80%',
                backgroundColor: msg.is_bot ? '#f7b98f' : '#c9dfff',
              }}
            >
              {msg.is_bot ? <Avatar alt="AI" src={avat} /> : <Avatar alt="User" src={user} />}
              {msg.content}
            </Box>
          </Box>
          </Slide>
        ))}
      </Paper>

      {!history && (
      <Box display="flex" mt={2} sx={{ width: '80%' }}>
          <TextField
            label="Ask a question"
            fullWidth
            value={inputMessage}
            variant="filled"
            sx={{ backgroundColor: 'white', borderRadius: '4px' }}
            onChange={(e) => dispatch(setInputMessage(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
          />
          <Button
            sx={{ marginLeft: '8px' }}
            variant="contained"
            color="primary"
            onClick={sendMessage}
          >
            Send
          </Button>
      </Box>
      )}
      {history && (
      <Button
        sx={{ margin: '8px' }}
        variant="contained"
        color="primary"
        onClick={() => window.location.reload()} // Reload the page
      >
        New Chat
      </Button>
      )}
    </Box>
  );
};

export default Chat;
