import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext } from "react";
import { UserDataContext } from "../contexts/UserDataContext";
const useStyles = makeStyles((theme) => ({
  item: {
    height: "64px",
    display: "flex",
    justifyContent: "start",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    "&:hover": {
      background: theme.palette.grey[500],
    },
    borderRadius: "5px",
  },
  img: {
    width: "64px",
    height: "64px",
  },
  titleBox: {
    marginLeft: "10px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
}));
function StackComponent({ n }) {
  const classes = useStyles();
  const { stack } = useContext(UserDataContext);

  return (
    <div>
      <Typography variant="caption">Stack</Typography>
      <Typography variant="subtitle1">
        Tools I use & love that you should check out.
      </Typography>

      <Grid container spacing={2}>
      {n > 0 ? (
          stack.slice(0, n).map((item) => (
            <Grid key={item.id} item md={6} xs={12}>
              <Box className={classes.item}>
                <img className={classes.img} src={item.logo} alt="" />
                <Box className={classes.titleBox}>
                  <Typography variant="body1">{item.title}</Typography>
                  <Typography variant="subtitle1">{item.category}</Typography>
                </Box>
              </Box>
            </Grid>
          ))
        ) : (
          stack.map((item) => (
            <Grid key={item.id} item md={6} xs={12}>
              <Box className={classes.item}>
                <img className={classes.img} src={item.logo} alt="" />
                <Box className={classes.titleBox}>
                  <Typography variant="body1">{item.title}</Typography>
                  <Typography variant="subtitle1">{item.category}</Typography>
                </Box>
              </Box>
            </Grid>
          ))
        )}

      </Grid>
    </div>
  );
}

export default StackComponent;
