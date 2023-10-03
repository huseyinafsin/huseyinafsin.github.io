import React, { useEffect, useState } from "react";
import StackComponent from "../components/StackComponet";
import { makeStyles } from "@mui/styles";
import CircleAvatar from "../components/CircleAvatar";
import profile from "../assets/img/yellow.jpg";
import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
const useStyles = makeStyles((theme) => ({
  container: {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  profile: {
    width: "210px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
  },
  body: {
    marginTop: "5%",
    display: "flex",
    alignSelf: "start",
  },
  modalStyle:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  }
  
}));

function Home() {
  const classes = useStyles();
  const [text, setText] = useState("");
  const keys = ["websites", "apps", "software"];

  useEffect(() => {
    let currentIndex = 0;

    const interval = setInterval(() => {
      setText(keys[currentIndex]);
      currentIndex = (currentIndex + 1) % keys.length;
    }, 2000);

    return () => clearInterval(interval);
  });

  const [open, setOpen] = React.useState(false);


  useEffect(() => {
    setOpen(true);
  }, []);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* Info */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        clo
      >
        <Box sx={{ width: 400}} className ={classes.modalStyle }>
        <Button onClick={handleClose} sx={{display:"flex",flexDirection:"row-reverse", justifyContent:"end"}}><CancelIcon/></Button>

          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            I still working on this site. Please give a time :D
          </p>
        </Box>
      </Modal>
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
      <StackComponent n={4} />
    </div>
  );
}

export default Home;
