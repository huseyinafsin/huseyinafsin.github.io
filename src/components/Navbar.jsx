import { AppBar, IconButton, Toolbar } from "@mui/material";
import React, { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import { LayoutContext } from "../contexts/Layout.Context";

const useStyles = makeStyles((theme) => ({
  nav:{
    width:"100%",
    [theme.breakpoints.up('md')]: {
      display:"none"
    },
    color:theme.palette.primary.main,
    backgroundColor:theme.palette.secondary.main,
  },
  toolbar:{
    color:theme.palette.primary.main,
    backgroundColor:theme.palette.secondary.main,
  }

}));
function Navbar({style}) {
  const classes = useStyles();
  const {toggleMenu} = useContext(LayoutContext)
  return (
    <nav  className={classes.nav} >
      <AppBar position="static">
        <Toolbar className={classes.toolbar} sx={{justifyContent:"end",display:"flex",}} >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.iconButton}
            sx={{ mr: 2,}}
            onClick={toggleMenu}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </nav>
  );
}

export default Navbar;
