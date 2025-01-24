import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';

const ChatList = ({ chats, onChatSelect }) => {
  return (
    <List
      sx={{ width: '100%', maxWidth: 300, padding: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#966579' }}
    >
      <h2 style={{ color: 'rgba(254, 138, 198, 0.22)', fontSize: '2rem' }}>Chats history</h2>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, maxHeight: 550, overflowY: 'auto', width: '100%', '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none', backgroundColor: 'rgba(254, 138, 198, 0.22)', borderRadius: 2, padding: 1  }}>
        {chats.map((chat) => (
          <ListItem
            key={chat.id}
            disableGutters
            secondaryAction={
              <IconButton aria-label="comment">
                <CommentIcon />
              </IconButton>
            }
            sx={{
              padding: 1,
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'grey.100',
                cursor: 'pointer',
              },
              transition: 'background-color 0.3s',
            }}
            onClick={() => onChatSelect(chat.chat_id)}
          >
            <ListItemText primary={chat.name} />
          </ListItem>
        ))}
      </Box>
    </List>
  );
};

export default ChatList;
