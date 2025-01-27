import React, { useEffect, useState } from 'react';
import Chat from '../Components/Chat';
import ChatList from '../Components/ChatList';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const Home = () => {
    const [chats, setChats] = useState([]);
    const [chatId, setChatId] = useState(1);
    const [history, setHistory] = useState(null);
    const apiUrl = import.meta.env.VITE_PROD_URL;
    const [userId, setUserId] = useState(null);
    const [error, setError] = useState(null);
    const token = useSelector((state) => state.token);

    const fetchUserId = async () => {
      const token = localStorage.getItem('access_token');
      try {
        const response = await fetch(`https://${apiUrl}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user ID');
        }
  
        const data = await response.json();
        setUserId(data.user_id);
        setError(null)
      } catch (error) {
        console.error(error);
        setError('You are not authenticated. Please log in.');
      }
    }
    const fetchStoredChats = async () => {
      try {
        const response = await fetch(`https://${apiUrl}/api/chats/${userId}`);
        const data = await response.json();
        if (data.chats && data.chats.length > 0) {
          setChats(data.chats);
          setChatId(data.chats.length + 1);
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
        const response = await fetch(`https://${apiUrl}/api/chats/${userId}/${chatId}/history`);
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          await fetchUserId();
        } catch (error) {
          setError('You are not authenticated. Please log in.');
        }
      };
    
      const token = localStorage.getItem('access_token');
      if (token) {
        fetchData();
      } else {
        setError('You are not authenticated. Please log in.');
      }
    }, [token]);
    
    useEffect(() => {
      if (userId) {
        fetchStoredChats();
      }
    }, [userId]);
  
    if (error) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
          <Typography variant="h5" color="error">
            {error}
          </Typography>
        </Box>
      );
    }
  
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', overflow: 'hidden' }}>
        <ChatList chats={chats} onChatSelect={handleChatClick} />
        {/* Render Chat only when userId is available */}
        {userId && <Chat userId={userId} chatId={chatId} history={history} />}
      </Box>
    );
  };

  export default Home;