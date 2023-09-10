import { React, useContext, useState } from "react";
import { Button, IconButton, Typography } from "@mui/material";
import downloadButton from "../assets/icons/download-svgrepo-com.svg";
import { Image } from "react-bootstrap";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { SidebarContext } from "../contexts/SidebarContext";
import { MaterialUISwitch } from "./MaterialUISwitch";
import { LayoutContext } from "../contexts/Layout.Context";
import { useTheme } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import MenuIcon from "@mui/icons-material/Menu";
import cv from "../assets/doc/Huseyin_Afsin.pdf";

const useStyles = makeStyles((theme) => ({
  button: {
    textTransform: "none",
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    padding: 0,
    height: "100%",
    marginLeft: "5%",
  },
  profileImage: {
    height: "64px",
    width: "64px",
    borderRadius: "50%",
  },
  sidebar: {
    backgroundColor: theme.palette.grey[50],
    color: theme.palette.primary.main,
    width: "15%",
    borderRight: theme.palette.grey[300],
    left: 0,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      display: "none",
    },
  },
  containerProfile: {
    width: "100%",
    height: "140px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  profileBox: {
    height: "63px",
    width: "100%",
    margin: "3%",
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  containerMenu: {
    width: "100%",
    height: "286px",
  },
  containerSocial: {
    width: "100%",
    height: "220px",
  },
  containerTools: {
    width: "100%",
    height: "200px",
  },
  containerTitle: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    marginLeft: "5%",
    borderBottom: theme.palette.grey[300],
    paddingBottom: "2%",
    fontSize: "small",
  },
  itemTitle: {
    marginLeft: "3%",
    textAlign: "center",
    color: theme.palette.primary.main,
  },
  containerItem: {
    width: "100%",
    height: "35px",
    display: "flex",
    justifyContent: "start",
    borderRadius: "10px",
    color: theme.palette.grey[50],
    alignItems: "center",
    verticalAlign: "midle",
    marginLeft: "10%",
  },
  toolItem: {
    color: theme.palette.grey[300],
    width: "100%",
    justifyContent: "start",
    marginLeft: "5%",
    marginTop: "5%",
    marginBottom: "5%",
    height: "80%",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
  },
  muiIcon: {
    color: theme.palette.grey[100],
    marginRight: "5%",
    fontSize: "36px",
  },
  text1: {
    padding: 0,
    margin: "1%",
    fontSize: "14px",
    fontStyle: "normal",
    fontFamily: '"Inter", sans-serif',
    fontWeight: 700,
    textAlign: "center",
    color: theme.palette.grey[200],
  },
  text2: {
    padding: 0,
    margin: "1%",
    fontSize: "14px",
    fontStyle: "normal",
    fontFamily: '"Inter", sans-serif',
    fontWeight: 700,
  },
  ppTitle: {
    padding: 0,
    margin: "1%",
    width: "70%",
    fontStyle: "normal",
    fontFamily: '"Inter", sans-serif',
    fontWeight: 700,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    verticalAlign: "middle",
  },
  activeItem: {
    color: theme.palette.primary.main[200],
    backgroundColor: theme.palette.grey[200],
    border: theme.palette.grey[300],
    width: "80%",
  },
}));
function Sidebar() {
  const classes = useStyles();
  const navigate = useNavigate();
  const { menu, social } = useContext(SidebarContext);
  const { isMenuOpen, toggleMenu } = useContext(LayoutContext);
  const [clickedItemIndex, setClickedItemIndex] = useState(0);
  const [checked] = useState(true);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const handleClick = (i, path) => {
    setClickedItemIndex(i);
    toggleMenu()
    navigate(path);
  };

  function download() {
    // console.log("cv")
    // var a = document.createElement("a");
    // a.href = cv;
    // a.setAttribute("download", "Huseyin_Afsin.pdf");
    // a.click();
  }
  return (
    <ThemeContext.Consumer>
      {(context) => {
        const toggleTheme = context.toggleTheme;
        return (
          <div
            className={classes.sidebar}
            style={
              isMenuOpen ? { display: "flex", flexDirection: "column" } : {}
            }
          >
            <div className={classes.containerProfile}>
              <div className={classes.profileBox}>
                <Image
                  src={
                    "https://avatars.githubusercontent.com/u/42337444?s=400&v=4"
                  }
                  alt=""
                  className={classes.profileImage}
                />
                <div className={classes.ppTitle}>
                  <Typography variant="h3">Hüseyin Afşin</Typography>
                  <Typography variant="subtitle1">
                    Software Developer
                  </Typography>
                </div>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  className={classes.iconButton}
                  sx={{ mr: 2 }}
                  onClick={toggleMenu}
                  style={!matches?{ display:"none"} :{}}
                >
                  <MenuIcon />
                </IconButton>
              </div>
            </div>
            <br />
            <div className={classes.containerMenu}>
              {menu.map((item, index) => (
                <div
                  key={item.id}
                  className={
                    index === clickedItemIndex
                      ? classes.activeItem + " " + classes.containerItem
                      : classes.containerItem
                  }
                >
                  <Button
                    className={classes.button}
                    onClick={() => handleClick(index, item.path)}
                  >
                    <div className={classes.muiIcon}>{item.icon}</div>
                    <Typography
                      variant="h3"
                      paddingLeft={"5%"}
                      className={classes.itemTitle}
                    >
                      {item.name}
                    </Typography>
                  </Button>
                </div>
              ))}
            </div>
            <br></br>
            <div className={classes.containerSocial}>
              <div className={classes.containerTitle}>Follow</div>
              {social.map((item, index) => (
                <div key={index} className={classes.containerItem}>
                  <Button className={classes.button} href={item.url}>
                    <div className={classes.muiIcon}>{item.icon}</div>
                    <Typography
                      variant="h3"
                      paddingLeft={"5%"}
                      className={classes.itemTitle}
                    >
                      {item.name}
                    </Typography>
                  </Button>
                </div>
              ))}
            </div>
            <div className={classes.containerTools}>
              <div className={classes.containerTitle}>
                <div className={classes.itemTitle}>Tools</div>
              </div>
              <div className={classes.containerItem}>
                <div className={classes.toolItem}>
                  <Typography variant="h3" className={classes.itemTitle}>
                    {checked ? "Dark Mode" : "Light Mode"}
                  </Typography>{" "}
                  <MaterialUISwitch
                    onChange={toggleTheme}
                    sx={{ m: 1 }}
                    style={{ verticalAlign: "center", height: "100%" }}
                    defaultChecked={checked}
                  />
                </div>
              </div>
              <div className={classes.containerItem}>
                <div className={classes.toolItem}>
                  <Typography variant="h3" 
                   onClick={download()}
                   className={classes.itemTitle}>
                    Get My Cv
                  </Typography>{" "}
                  <Button >
                    <img src={downloadButton} style={{width:"100%", height:"30px"}} alt="" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </ThemeContext.Consumer>
  );
}

export default Sidebar;
