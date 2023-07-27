import styles from "./App.css";
import pp from "./assets/img/profile.jpeg";
import { Image } from "react-bootstrap";
import React, { useState } from "react";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import NearMeRounded from "@mui/icons-material/NearMeRounded";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import CreateRoundedIcon from "@mui/icons-material/CreateRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import DialpadRoundedIcon from "@mui/icons-material/DialpadRounded";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Button } from "@mui/material";
import { v1 as uuidv1 } from 'uuid';


function App() {
  const menu = [
    { 
      id: uuidv1(),
      name: "Home",
      icon: <ExploreRoundedIcon /> },
    {
      id: uuidv1(),
      name: "Projects",
      icon: <NearMeRounded />,
    },
    { 
      id: uuidv1(),
      name: "Boutique",
      icon: <ShoppingBagRoundedIcon /> },
    {
      id: uuidv1(),
      name: "Writings",
      icon:  <CreateRoundedIcon />,
    },
    {
      id: uuidv1(),
      name: "Stack",
      icon: <BuildRoundedIcon />,
    },
    { 
      id: uuidv1(),
      name: "About",
      icon: <FaceRoundedIcon /> },
    {
      id: uuidv1(),
      name: "Contact",
      icon: <DialpadRoundedIcon />,
    },
  ];
  const social = [
    { 
      id: uuidv1(),
      name: "Linked",
      icon: <LinkedInIcon />,
      url:"https://www.linkedin.com/in/huseyinafsin/"
    },
    {
      id: uuidv1(),
      name: "GitHub",
      icon: <GitHubIcon />,
      url:"https://www.linkedin.com/in/huseyinafsin/"

    },
    { 
      id: uuidv1(),
      name: "Twitter",
      icon: <TwitterIcon /> ,
      url:"https://www.linkedin.com/in/huseyinafsin/"
    },
    {
      name: "Instagram",
      icon:  <InstagramIcon />,
      url:"https://www.linkedin.com/in/huseyinafsin/"
    },
  ]
  const currentYear = new Date().getFullYear();
  const [clickedItemIndex, setClickedItemIndex] = useState(-1);
  const handleClick = (i) => {
    console.log(i)
    setClickedItemIndex(i);
  };

  return (
    <div className="container">
      <div className="sidebar">
        <div className="container-profile">
          <div className="profile-box">
            <Image src={pp} alt="" className="profil-image" />
            <div className="container-title">
              <h5 className="text-1">Hüseyin Afşin</h5>
              <h5 className="text-2">Software Developer</h5>
            </div>
          </div>
        </div>
        <br />
        <div className="container-menu">
          {menu.map((item, index) => (
            <div key={item.id}  className={index ===clickedItemIndex ? "container-item item-active" : "container-item"}>
              <Button style={itemBtn} onClick={()=>handleClick(index)}>
                <span className="mui-icon">{item.icon}</span>
                <div className="item-title">{item.name}</div>
              </Button>
            </div>
          ))}

        </div>
        <br></br>
        <div className="container-social">
          <div className="container-item">
            <div className="item-title">Follow</div>
          </div>
          {social.map((item) => (
            <div key={item.id} className="container-item">
              <Button 
              style={itemBtn} href={item.url}>
                <span className="mui-icon">{item.icon}</span>
                <div className="item-title">{item.name}</div>
              </Button>
            </div>
          ))}

        </div>
      </div>
      <div className="main">
        <div className="content">Content</div>
        <div className="footer">
          <div className="container-footer">
            <span className="mui-icon">
              <RadioButtonUncheckedRoundedIcon style={iconSize} />
            </span>
            <div className="text-2"> Built with React ⚛️</div>
          </div>
          <div className="container-footer">
            <span className="mui-icon">
              <RadioButtonUncheckedRoundedIcon style={iconSize} />
            </span>
            <div className="text-2">Made by </div>
            <div className="text-1">Hüseyin </div>
          </div>
          <div className="container-footer">
            <div className="text-2"> © {currentYear}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

const iconSize = { fontSize: "0.70rem" };
const itemBtn = {
  textTransform: "none",
  width: "90%",
  justifyContent: "start",
  padding: 0,
  marginRight: 0,
};
