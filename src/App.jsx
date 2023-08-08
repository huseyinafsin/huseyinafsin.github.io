import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { ThemeProvider } from "@mui/material";
import Error404 from "./pages/Error404";
import DefaultLayout from "./layouts/DefaultLayout";
import EmptyLayout from "./layouts/EmptyLayout";
import React, { Component } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import Stack from "./pages/Stack";
import LayoutProvider from "./contexts/Layout.Context";
import UserDataProvider from "./contexts/UserDataContext";

class App extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {(context) => {
          const { isDarkTheme, light, dark } = context;
          const theme = isDarkTheme ? light : dark;
          return (
            <ThemeProvider theme={theme}>
              <LayoutProvider>
                  <DefaultLayout>
                  <UserDataProvider>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/stack" element={<Stack />} />
                      <Route path="/boutique" element={<Stack />} />
                      <Route path="/writings" element={<Stack />} />
                      <Route path="/projects" element={<Stack />} />
                    </Routes>
                    </UserDataProvider>
                  </DefaultLayout>
              </LayoutProvider>
              <EmptyLayout>
                <Routes>
                  <Route path="*" element={<Error404 />} />
                </Routes>
              </EmptyLayout>
            </ThemeProvider>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default App;
