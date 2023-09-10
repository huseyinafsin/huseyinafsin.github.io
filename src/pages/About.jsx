import React from "react";
import img from "../assets/img/about.jpg";
import { Image } from "react-bootstrap";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  aboutImg: {
    width: "100%",
    aspectRatio: "16/9",
  },
}));
function About() {
  const classes = useStyles();
  return (
    <div>
      <Typography
      variant="caption"
      >About Me</Typography>
      <h4>
        UX Designer at Apple who loves minimal design, Grids & good coffee.
      </h4>
      <Image className={classes.aboutImg} src={img}></Image>
      <Typography variant="body1">
      Upcoming Computer Engineering graduate offering a strong foundation in software engineering and programming principles across multiple platforms. Experienced in data structures and object-oriented programming; developing, testing and debugging code. Quick learn and master new technologies; successful working in both team and self-directed setting.

      </Typography>
    </div>
  );
}

export default About;
