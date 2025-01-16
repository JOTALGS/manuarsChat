import React from 'react';
import { Provider } from 'react-redux';
import store from './stores/reduxStore';
import Chat from './Components/Chat';
import { Box } from '@mui/material';

const App = () => {
  return (
    <Provider store={store}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
        <Chat userId={1}/>
      </Box>
    </Provider>
  );
};

export default App;