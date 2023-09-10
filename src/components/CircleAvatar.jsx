import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';

const CircleAvatar = ({ src, alt }) => {
    return (
      <div style={{
        display: 'inline-block',
        border: '2px solid white', 
        borderRadius: '50%', 
        overflow: 'hidden', 
        padding:"5px"
      }}>
      <Avatar alt={alt} src={src} sx={{ width: 200, height: 200 }} />
      </div>

    );
  };
  

export default CircleAvatar;
