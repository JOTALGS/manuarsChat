import React, { useEffect, useState } from 'react';
import Chat from '../Components/Chat';
import ChatList from '../Components/ChatList';
import { Box } from '@mui/material';

const Home = () => {
    const [chats, setChats] = useState([]);
    const [chatId, setChatId] = useState(null);
    const [history, setHistory] = useState(null);
  
    const fetchStoredChats = async () => {
      try {
        const response = await fetch('http://35.199.103.104:8000/api/chats');
        const data = await response.json();
        if (data.chats && data.chats.length > 0) {
          setChats(data.chats);
          setChatId(data.chats[data.chats.length - 1].chat_id + 1);
        } else {
          setChats([]);
          setChatId(1);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleChatClick = async (chatId) => {
      console.log('Clicked Chat ID:', chatId);
      try {
        const response = await fetch(`http://35.199.103.104:8000/api/chats/${chatId}/history`);
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchStoredChats();
      console.log(chatId);
    }, []);
  
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <ChatList chats={chats} onChatSelect={handleChatClick} />
        <Chat userId={1} chatId={chatId} history={history} />
      </Box>
    );
  };

  export default Home;