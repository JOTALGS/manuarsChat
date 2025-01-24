import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import welcome from '../assets/welcome.png';
import { Link } from 'react-router-dom'; 
import GitHubIcon from '@mui/icons-material/GitHub';

const Welcome = () => {
    return (
			<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', height: '100vh', width: '100vw'}}
        style={{
          background: `
            radial-gradient(circle at 50% 150%, white 75%, violet 90%),
            linear-gradient(to bottom, transparent, white)
          `,
          backgroundBlendMode: 'screen',
          backgroundSize: '100% 100%, 100% 100%',
          backgroundPosition: 'top, bottom',
          backgroundRepeat: 'no-repeat',
          fontFamily: "'Jersey 10', sans-serif",
        }}
      >
        <h1
          style={{
            position: 'absolute',
            top: '4%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'linear-gradient(to right, #750f58, #7952a3, #83b1d4)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            fontSize: '4.5rem',
            fontFamily: "'Jersey 10', sans-serif",
            fontWeight: 'bold',
            zIndex: 1000
          }}
        >
          Manuar's chat system clone!
        </h1>
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: '200px', width: '100%'}}>
          <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start',
              animation: 'moveLeft 1s ease-in-out',
              '@keyframes moveLeft': {
                from: { transform: 'translateX(20%)' },
                to: { transform: 'translateX(0)' },
              }, }}>
              <h1 style={{ fontSize: '4rem' }}>Welcome</h1>
              <p style={{ fontSize: '1.8rem' }}>This is a simple chat system powered by google Gemini API</p>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                <Link to="/login" style={{ marginTop: '16px', textDecoration: 'none' }}>
                  <Button variant="contained" color="tertiary" sx={{ borderRadius: '6px', height: '45px', width: '120px', padding: '6px' }}>
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup" style={{ marginTop: '16px', textDecoration: 'none' }}>
                  <Button variant="contained" color="secondary" sx={{ borderRadius: '6px', height: '45px', width: '120px', padding: '6px' }}>
                    Sign Up
                  </Button>
                </Link>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', height: '100px', marginTop: '100px'}}>
                <p style={{ color: '#828282', fontSize: '1.2rem', fontFamily: "sans-serif" }}>
                  Check out the source code on 
                </p>
                <Button
                  variant="outlined"
                  color="secondary"
                  component="a"
                  href="https://github.com/JOTALGS/manuarsChat"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ borderRadius: '6px', height: '45px', padding: '6px' }}
                >
                  GitHub
                </Button>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '36px', width: '50%', borderLeft: '1px solid #ccc' }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px',
              animation: 'moveRight 1s ease-in-out, scaleAndRotate 15.5s ease-in-out 15s infinite',
              '@keyframes moveRight': {
                from: { transform: 'translateX(-20%)' },
                to: { transform: 'translateX(0)' },
              }, 
              '@keyframes scaleAndRotate': {
                '0%': { transform: 'scale(1) rotate(0deg)' },
                '5%': { transform: 'scale(1.2) rotate(0deg)' },
                '12%': { transform: 'scale(1.2) rotate(360deg)' },
                '16%': { transform: 'scale(0.9) rotate(360deg)' },
                '18%': { transform: 'scale(1) rotate(360deg)' },
                '100%': { transform: 'scale(1) rotate(360deg)' },
              },
            '--delay': '15s', }}
              
              >
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
        
        <Box
          component="a"
          href="https://github.com/JOTALGS"
          target="_blank"
          rel="noopener noreferrer"
          textDecoration="none"
          color={'#828282'}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            marginTop: '100px',
            cursor: 'pointer',
            '&:hover .github-icon': {
              opacity: 1,
              transform: 'translateY(0px)',
            },
          }}
        >
          <h4 style={{ fontSize: '1.5rem' }}>By JOTALGS</h4>
          <GitHubIcon
            className="github-icon"
            sx={{
              fontSize: '1.8rem',
              color: '#828282',
              opacity: 0,
              transform: 'translateY(20px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          />
        </Box>
			</Box>
    );
  };

	export default Welcome;