import React, { useEffect, useState } from 'react'
import StackComponent from '../components/StackComponet'
import { makeStyles } from "@mui/styles";
import CircleAvatar from '../components/CircleAvatar';
import profile from "../assets/img/yellow.jpg";
import { Grid, Typography } from "@mui/material";
const useStyles = makeStyles((theme) => ({
  container: {
    height: "400px",
    display: "flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems:"center"
  },
  profile: {
    width: "310px",
    height: "300px",
    display:"flex",
    justifyContent:"center"
  },
  body: {
    marginTop: "5%",
    display:"flex",
    alignSelf:"start"
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

  });
  return (
    <div>
      <Typography variant="caption">
        Hey, I'm Hüseyin. I design{" "}
        <span id="changingText" style={{ color: "#7c7f82" }}>
          {text}
        </span>
      </Typography>
      <br />
      <br />
      <div className={classes.container}>
          <Grid className={classes.profile}>
            <CircleAvatar src={profile} alt="Profile Picture" />
          </Grid>
          <Grid className={classes.body}>
            <Typography variant="body1">
              I experienced at Software Development based in Cyprus.
            </Typography>
          </Grid>
      </div>
      </div>
      
    )
}

export default Home


