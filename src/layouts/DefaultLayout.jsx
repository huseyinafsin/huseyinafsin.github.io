import { makeStyles } from "@mui/styles";
import React, { useContext } from "react";

//Components
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SidebarProvider from "../contexts/SidebarContext";
import { useTheme } from "@emotion/react";
import { LayoutContext } from "../contexts/Layout.Context";
import { Grid } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "row",
      width: "100%"
    },
    page: {
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
      minHeight: "100vh",
      width: `calc(100% - ${drawerWidth}px)  !important`,
      [theme.breakpoints.down('md')]: {
        width: "100% !important",
      },
      float: "right",
    },
    navbar: {
      width: "100%",
    },
    active: {
      backgroundColor: theme.palette.grey[900],
    },
    title: {
      padding: theme.spacing(2),
    },
    footer: {
      width: `calc(100% - ${drawerWidth}px)  !important`,
      position: "fixed",
      bottom: 0,
    },
    content: {
      minHeight: `calc(100vh - ${60}px)  !important`,
      width: "100%",
      maxWidth: "100vw",
    },
    container: {
      margin: "5% 25% 0",
      // maxWidth: `calc(100% - ${260}px)  !important`,
    },
  };
});

function DefaultLayout({ children }) {
  const classes = useStyles();
  const {isMenuOpen} = useContext(LayoutContext)
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div className={classes.root}>
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
      <div className={classes.page} style={( isMenuOpen && matches) ? {width: "0% !important",} :{} }>
        <Navbar />
        <Grid className={classes.content} style={( matches) ? {display:"flex", justifyContent:"center", padding:"5%"} :{} }>
          <div className={classes.container}
          style={( matches) ? {margin: "5% 0% 0"} :{} }
          >{children}</div>
        </Grid>
        <Footer className={classes.footer} />
      </div>
    </div>
  );
}
export default DefaultLayout;
