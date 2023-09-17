import { createTheme } from "@mui/material";
import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();
let theme = createTheme({
  typography: {
    fontFamily: "Inter",
    h3: {
      fontFamily: "Inter",
      fontWeight: 200,
      fontSize: "0.9rem",
      lineHeight: 1,
      letterSpacing: "0rem",
      textTransform: "none",
    },
    h2: {
      fontFamily:"Inter",
      fonSize: "16px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "0.9em",
      paragraphSpacing: "0px",
    },
    caption: {
      display: "block",
      fontSize: "48px",
      fontFamily: "Inter",
      fontWeight: "600",
      letterSpacing: "-2px",
      lineHeight: "56px",
    },
    body1: {
      fontFamily: "Inter",
      fontSize: "20px",
 
    },

    subtitle1:{
      color:"grey"
    }
  },
})
const darkTheme = createTheme(theme,{
  palette: {
    mode: "dark",
    primary: {  
      main: "#ffffff",
    },
    secondary: {
      main: "#161616",
    },
    grey: {
      50: "rgb(28, 28, 28)", //sidebar primary
      100: "rgb(124, 127, 130)", //sidebar bg
      200: "#2b2b2b", //active item
      300: "1px solid rgba(255, 255, 255, 0.12)", //border
      500:"#1c1c1c"
    },
    background:{
      paper:"#161616",
      default:"#161616"
    },
    text:{
      color:"grey"
    }
  },
});

const lightTheme = createTheme(theme,{
  palette: {
    mode: "light",
    primary: {
      main: "#161616",
    },
    secondary: {
      main: "#ffffff",
    },
    grey: {
      50: "#c3c7c4", //sidebar primary
      100: "rgb(124, 127, 130)", //sidebar bg
      200: "#e1e8e3", //active item
      300: "1px solid rgba(255, 255, 255, 0.12)", //border
      500:"#1c1c1c"

    },
    background:{
      paper:"#ffffff",
      default:"#ffffff"
    }
  },
});


function ThemeContextProvider (props) {

  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [light] = useState(lightTheme)
  const [dark] = useState(darkTheme)
  const toggleTheme = () =>{
    setIsDarkTheme({isDarkTheme : !isDarkTheme})
  }

       
  useEffect(()=>{
    const navbar = document.getElementsByTagName('header')[0];
    const navbarColor = window.getComputedStyle(navbar).backgroundColor;
    const body = document.getElementsByTagName('body')[0];
    body.style.backgroundColor =navbarColor
  },[isDarkTheme])
    return (
      <ThemeContext.Provider value={{ isDarkTheme, dark, light, toggleTheme: toggleTheme }}>
        {props.children}
      </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;
