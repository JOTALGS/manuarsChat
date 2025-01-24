import React from 'react';
import { Box } from '@mui/material';
import SignInCard from '../Components/SignInCard';

const SignUp = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
        <SignInCard purpose={'register'}/>
      </Box>
    );
  };

	export default SignUp;