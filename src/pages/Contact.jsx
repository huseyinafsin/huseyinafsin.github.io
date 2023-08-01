import { useTheme } from "@emotion/react";
import {
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import React from "react";

function Contact() {
  const useStyles = makeStyles({
    form: {},
    formControl: {
      display: "grid",
      justifyContent: "space-between",
      width: "100%" 
    },
    textField:{
      width:"48%"
    }
  });
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h1">Contact</Typography>
      <Typography variant="h4">
        I’m always looking to collaborate on interesting projects with great
        people. Need a supportive hand? I have two!
      </Typography>
      <div className="contactForm">
        <div className="formControl">
          <TextField
            className={classes.textField}
            id="textName"
            label="Name"
            fullWidth
          />
          <TextField
            className={classes.textField}
            id="textEmail"
            label="Name"
            fullWidth
          />

        </div>
      </div>
    </div>
  );
}

export default Contact;
