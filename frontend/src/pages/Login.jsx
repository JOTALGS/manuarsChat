import React from 'react';
import { Box } from '@mui/material';
import SignInCard from '../Components/SignInCard';

const LogIn = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
        <SignInCard purpose={'login'}/>
      </Box>
    );
  };

	export default LogIn;