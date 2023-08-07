import { Image } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
const useStyles = makeStyles((theme) => ({
  item: {
    background: "grey",
    width: "100%",
    height: "64px",
    display: "flex",
    justifyContent:"start"
  },
  img: {
    width: "64px",
    height: "64px",
  },
  titleBox:{
    marginLeft:"10px"
  }
}));
function Stack() {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="caption">Stack</Typography>
      <Typography variant="subtitle1">
        Tools I use & love that you should check out.
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Paper className={classes.item}>
            <img
              className={classes.img}
              src="https://www.svgrepo.com/show/532030/circle-heat.svg"
            />
            <Box className={classes.titleBox}>
              <Typography variant="body1" >Framer</Typography>
              <Typography variant="subtitle1" >Website Builder</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
        <Paper className={classes.item}>
            <img
              className={classes.img}
              src="https://www.svgrepo.com/show/532030/circle-heat.svg"
            />
            <Box className={classes.titleBox}>
              <Typography variant="body1" >Framer</Typography>
              <Typography variant="subtitle1" >Website Builder</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Stack;
