import React from 'react';
import { Box } from '@mui/material';
import SignInCard from '../Components/SignInCard';

const Welcome = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
        <SignInCard />
      </Box>
    );
  };

	export default Welcome;