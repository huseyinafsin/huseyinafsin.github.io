import { AppBar, IconButton, Toolbar } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";

function Navbar() {

  return (
    <div className={"navbar"} >
      <AppBar position="static" sx={{color:"var(--primary-color)",
       backgroundColor:"var(--secondary-color)"}}>
        <Toolbar sx={{justifyContent:"end",display:"flex",}} >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2,}}
            onClick={()=>{}}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
