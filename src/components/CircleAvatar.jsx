import React from 'react';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container:{
    display: 'flex',
    border: '2px solid white', 
    borderRadius: '50%', 
    overflow: 'hidden', 
    padding:"5px",
    width:"100%",
    height:"100%",
  },
  avatar: {
    width:"100% !important",
    height:"100% !important"
  },

}));
const CircleAvatar = ({ src, alt }) => {
  const classes = useStyles();
  return (
      <div className={classes.container}>
      <Avatar alt={alt} src={src} className={classes.avatar} />
      </div>

    );
  };
  

export default CircleAvatar;
