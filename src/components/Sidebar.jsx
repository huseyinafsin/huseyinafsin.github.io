import { React, useContext, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { Switch, styled } from "@mui/material";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { Image } from "react-bootstrap";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import NearMeRounded from "@mui/icons-material/NearMeRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import DialpadRoundedIcon from "@mui/icons-material/DialpadRounded";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from '@mui/icons-material/Menu';
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import { v1 as uuidv1 } from "uuid";
import { ThemeContext } from "../App";
function Sidebar() {
  const menu = [
    {
      id: uuidv1(),
      name: "Home",
      icon: <ExploreRoundedIcon />,
      path: "home",
    },
    {
      id: uuidv1(),
      name: "Projects",
      icon: <NearMeRounded />,
      path: "projects",
    },
    {
      id: uuidv1(),
      name: "Boutique",
      icon: <ShoppingBagRoundedIcon />,
      path: "boutique",
    },
    {
      id: uuidv1(),
      name: "Writings",
      icon: <CreateRoundedIcon />,
      path: "writings",
    },
    {
      id: uuidv1(),
      name: "Stack",
      icon: <BuildRoundedIcon />,
      path: "stack",
    },
    {
      id: uuidv1(),
      name: "About",
      icon: <FaceRoundedIcon />,
      path: "about",
    },
    {
      id: uuidv1(),
      name: "Contact",
      icon: <DialpadRoundedIcon />,
      path: "contact",
    },
  ];
  const social = [
    {
      id: uuidv1(),
      name: "Linkedin",
      icon: <LinkedInIcon />,
      url: "https://www.linkedin.com/in/huseyinafsin/",
    },
    {
      id: uuidv1(),
      name: "GitHub",
      icon: <GitHubIcon />,
      url: "https://www.linkedin.com/in/huseyinafsin/",
    },
    {
      id: uuidv1(),
      name: "Twitter",
      icon: <TwitterIcon />,
      url: "https://www.linkedin.com/in/huseyinafsin/",
    },
    {
      name: "Instagram",
      icon: <InstagramIcon />,
      url: "https://www.linkedin.com/in/huseyinafsin/",
    },
  ];
  const [clickedItemIndex, setClickedItemIndex] = useState(0);
  const [checked, setChecked] = useState(true);
  const themeContext = useContext(ThemeContext);

  const handleClick = (i) => {
    setClickedItemIndex(i);
  };

  const handleSwitch = () => {
    themeContext.toggleTheme();
    setChecked(!checked)
  };
  const itemBtn = {
    textTransform: "none",
    width: "90%",
    justifyContent: "start",
    alignItems: "center",
    padding: 0,
    marginRight: 0,
    marginLeft: "5%",
  };

  return (
    <div className="sidebar">
      <div className="container-profile">
        <div className="profile-box">
          <Image
            src={"https://avatars.githubusercontent.com/u/42337444?s=400&v=4"}
            alt=""
            className="profil-image"
          />
          <div className="pp-title">
            <h5 className="text-1">Hüseyin Afşin</h5>
            <h5 className="text-2">Software Developer</h5>
          </div>
          <IconButton
            
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, color:"var(--primary-color)"}}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </div>
      <br />
      <div className="container-menu">
        {menu.map((item, index) => (
          <div
            key={item.id}
            className={
              index === clickedItemIndex
                ? "container-item item-active"
                : "container-item"
            }
          >
            <Button
              style={itemBtn}
              href={item.path}
              onClick={() => handleClick(index)}
            >
              <span className="mui-icon">{item.icon}</span>
              <div className="item-title">{item.name}</div>
            </Button>
          </div>
        ))}
      </div>
      <br></br>
      <div className="container-social">
        <div className="container-title">Follow</div>
        {social.map((item, index) => (
          <div key={index} className="container-item">
            <Button style={itemBtn} href={item.url}>
              <span className="mui-icon">{item.icon}</span>
              <div className="item-title">{item.name}</div>
            </Button>
          </div>
        ))}
      </div>
      <div className="container-tools">
        <div className="container-title">
          <div className="item-title">Tools</div>
        </div>
        <div className="container-item">
          <div className="tool-item" style={{border:"var(--border-color) 1px solid", 
          width:"100%", justifyContent:"start", marginLeft:"5%", marginTop:"5%",marginBottom:"5%",height:"80%",
            borderRadius:"10px",
           display:"flex", alignItems:"center"}}>
            <div className="item-title">{checked ? "Dark Mode" : "Light Mode"}</div>
            <MaterialUISwitch
              onChange={handleSwitch}
              sx={{ m: 1 }}
              style={{ verticalAlign: "center", height: "100%" }}
              defaultChecked={checked}
            />
          </div>
        </div>
        <div className="container-item">
          <div className="tool-item" style={{border:"var(--border-color) 1px solid", 
          width:"100%", justifyContent:"start", marginLeft:"5%", marginTop:"5%",marginBottom:"5%",height:"80%",
            borderRadius:"10px",
           display:"flex", alignItems:"center"}}>
            <div className="item-title">Get my cv</div>

            <Button>
              <ExpandCircleDownIcon/>
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));
