import React, { createContext, useState } from 'react'
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
import GitHubIcon from "@mui/icons-material/GitHub";
import { v1 as uuidv1 } from "uuid";

export const SidebarContext = createContext();

const SidebarProvider = (props) => {

    const [menu] = useState([
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
    ])
    const [social] = useState([
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
    ])
    return ( <SidebarContext.Provider value={{menu: menu, social: social}}>{props.children}</SidebarContext.Provider> );
}
 
export default SidebarProvider;