import React, { useEffect, useState } from 'react'
import StackComponent from '../components/StackComponet'
import { makeStyles } from "@mui/styles";
import CircleAvatar from '../components/CircleAvatar';
import profile from "../assets/img/yellow.jpg";
import { Grid, Typography } from '@mui/material';
const useStyles = makeStyles((theme) => ({
  container:{
    height:"400px"
  },

}));


function Home() {
  const classes = useStyles();
  const [text, setText] = useState('');
  const keys =["websites", "apps", "software"]

  useEffect(() => {
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      setText(keys[currentIndex]);
      currentIndex = (currentIndex + 1) % keys.length;
    }, 2000);
    
    return () => clearInterval(interval);
  }, [])
  return (
      <div>
        <div className={classes.container}>
          <Grid container>
            <Grid item xs="8">
              <div className="caption" style={{display:"flex", flexDirection:"column"}}>
              <Typography variant='caption' >
              Hey, I'm Hüseyin. I design <span id='changingText' style={{color:"#7c7f82"}}> {text} </span>
              </Typography>
              </div>
            </Grid>
            <Grid item xs="4">
            <CircleAvatar src={profile} alt="Profile Picture" />
            </Grid>
          </Grid>
        </div>
        <StackComponent n={4}/>
      </div>
      
    )
}

export default Home


