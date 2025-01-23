import React from 'react';
import { Box, Button } from '@mui/material';
import welcome from '../assets/welcome.png';
import { Link } from 'react-router-dom'; 

const Welcome = () => {
    return (
			<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '100vh', width: '100vw'}}>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: '150px', width: '100%'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }}>
            <h1>Welcome</h1>
            <h2>Manuar's chat system clone!</h2>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
              <Link to="/login" style={{ marginTop: '16px', textDecoration: 'none' }}>
                <Button variant="contained" color="primary" sx={{ borderRadius: '100%', height: '120px', width: '120px', padding: '6px' }}>
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up" style={{ marginTop: '16px', textDecoration: 'none' }}>
                <Button variant="contained" color="primary" sx={{ borderRadius: '100%', height: '120px', width: '120px', padding: '6px' }}>
                  Sign Up
                </Button>
              </Link>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '36px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }} >
              <img
                src={welcome}
                alt="Background"
                style={{
                  display: 'flex',
                  alignSelf: 'center',
                  width: '400px',
                  height: '440px',
                  zIndex: 0,
                }}
              />
            </Box>
          </Box>
        </Box>
        
        <Box>
          <h4>By JOTALS</h4>
        </Box>
			</Box>
    );
  };

	export default Welcome;