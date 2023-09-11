import React from 'react';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {

  },

}));
const CircleAvatar = ({ src, alt }) => {
  const classes = useStyles();
   
  
    return (
      <div style={{
        display: 'flex',
        border: '2px solid white', 
        borderRadius: '50%', 
        overflow: 'hidden', 
        padding:"5px"
      }}>
      <Avatar alt={alt} src={src} xs={{width:"300px", height:"300px"}}   />
      </div>

    );
  };
  

export default CircleAvatar;
