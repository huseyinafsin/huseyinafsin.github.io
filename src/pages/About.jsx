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
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae dolorum
        ima soluta hic incidunt facilis. Necessitatibus, ipsa eos magni
        recusandae hic ab. Optio, quidem!id perferendis maxime Lorem ipsum dolor
        sit amet ecusandae hic ab. incidunt facilis. Necessitatibus, ipsa eos
        magni recusandae hic ab. Optio, quidem!id perferendis maxime Lorem ipsum
        dolor sit amet ecusandae hic ab. incidunt facilis. Necessitatibus, ipsa
        eos magni recusandae hic ab. Optio, quidem!id perferendis maxime Lorem
        ipsum dolor sit amet ecusandae hic ab. Lorem, ipsum dolor sit amet
        consectetur adipisicing elit. Vitae dolorum ima soluta hic incidunt
        facilis. Necessitatibus, ipsa eos magni recusandae hic ab. Optio,
        quidem!id perferendis maxime Lorem ipsum dolor sit amet ecusandae hic
        ab. incidunt facilis. Necessitatibus, ipsa eos magni recusandae hic ab.
        Optio, quidem!id perferendis maxime Lorem ipsum dolor sit amet ecusandae
      </Typography>
    </div>
  );
}

export default About;
