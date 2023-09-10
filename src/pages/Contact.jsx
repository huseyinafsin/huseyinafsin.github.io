import { useTheme } from "@emotion/react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import React from "react";
const useStyles = makeStyles((theme) => ({
  formControl: {
    display: "grid",
    justifyContent: "space-between",
    width: "100%",
  },
  textField: {
    background: theme.palette.grey[50],
    color: theme.palette.grey[300],
  },
  sentGrid: { 
    height: "56px",
    border: theme.palette.grey[300], 
    background: theme.palette.grey[50],
    justifyContent:"center",
    display:"flex"
  },
  sentBtn: { 
    width:"100%"
  },
}));
function Contact() {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h1">Contact</Typography>
      <Typography variant="body1">
        I’m always looking to collaborate on interesting projects with great
        people. Need a supportive hand? I have two!
      </Typography>
      <br />
      <div className="contactForm">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="textName"
              label="Name"
              fullWidth
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="textEmail"
              label="Email"
              fullWidth
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              multiline
              fullWidth
              label="Message"
              rows={10}
              maxRows={10}
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box className={classes.sentGrid}>
              <Button className={classes.sentBtn}>Send</Button>
            </Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Contact;
