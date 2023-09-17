import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
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
    justifyContent: "center",
    display: "flex",
  },
  sentBtn: {
    width: "100%",
  },
  floatingLabelFocusStyle: {
    color: theme.palette.primary,
  },
}));

function Contact() {
  const classes = useStyles();
  const form = useRef();
  const [wasSent] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_rpapezh",
        "template_n8x4n0s",
        form.current,
        "lUO44CNwxqJYnPraf"
      )
      .then(() => {
        setIsOpen(true);
        setTimeout(() => {
          setIsOpen(false);
        }, 6000);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
    }, 6000);
  };
  return (
    <div>
      <Typography variant="h1">Contact</Typography>
      <Typography variant="body1">
        I’m always looking to collaborate on interesting projects with great
        people. Need a supportive hand? I have two!
      </Typography>
      <br />

      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {wasSent !== null ? (
          <Alert severity="success"> I got your message 🫠</Alert>
        ) : (
          <Alert severity="error"> Omg! Something went wrong 😭 </Alert>
        )}
      </Snackbar>
      <form className="contactForm" ref={form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id="textName"
              label="Name"
              name="from_name"
              fullWidth
              className={classes.textField}
              inputMode="text"
              InputLabelProps={{ className: classes.floatingLabelFocusStyle }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="textEmail"
              label="Email"
              name="email_from"
              fullWidth
              className={classes.textField}
              inputMode="email"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              multiline
              fullWidth
              label="Message"
              name="message"
              inputMode="ht"
              rows={10}
              maxRows={10}
              className={classes.textField}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box className={classes.sentGrid}>
              <Button className={classes.sentBtn} type="submit">
                {" "}
                <MarkunreadIcon />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default Contact;
