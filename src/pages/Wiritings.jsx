import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react'
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    item: {
      width:"80%",
      height:"400px",
      display:"flex",
      justifySelf:"center"
    },
    img: {
      width: "100%",
      height: "100%",
    },
    titleBox: {
      marginLeft: "10px",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
  }));
function Wiritings() {
    const classes = useStyles();
    const [writings]   = useState([
        {
            id:"66",
            img:"https://miro.medium.com/v2/resize:fit:640/format:webp/1*Sdh1Nq_KFeD_27IC2ULRAA.png"
        }
    ]);
  
    return (
      <div>
        <Typography variant="caption">Writings</Typography>
        <Typography variant="subtitle1">
          Wiritng about technologies I used
        </Typography>
            <br />
        <Grid container spacing={2}>
            {
            writings.map((item) => (
              <Grid key={item.id} item xs={12}>
                <Box className={classes.item}>
                  <img className={classes.img} src={item.img} alt="" />
                </Box>
                <Box className={classes.titleBox}>
                    <Typography variant="body1">{item.title}</Typography>
                    <Typography variant="subtitle1">{item.category}</Typography>
                  </Box>
              </Grid>
            ))  
            }
        </Grid>
      </div>
    );
}

export default Wiritings