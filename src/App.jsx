import { Route, Routes } from "react-router-dom";

import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { ThemeProvider } from "@mui/material";
import Error404 from "./pages/Error404";
import DefaultLayout from "./layouts/DefaultLayout";
import EmptyLayout from "./layouts/EmptyLayout";
import React from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import Stack from "./pages/Stack";
import LayoutProvider from "./contexts/Layout.Context";
import UserDataProvider from "./contexts/UserDataContext";
import Projects from "./pages/Projects";
import Wiritings from "./pages/Wiritings";

function App() {
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
                    <Route path="/writings" element={<Wiritings />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/404" element={<Error404 />} />
                    <Route path="*" element={<Error404 />} />
                  </Routes>
                </UserDataProvider>
              </DefaultLayout>
              {/* <EmptyLayout>
                <Routes>
                  <Route path="/404" element={<Error404 />} />
                  <Route path="*" element={<Error404 />} />
                </Routes>
              </EmptyLayout> */}
            </LayoutProvider>
          </ThemeProvider>
        );
      }}
    </ThemeContext.Consumer>
  );
}

export default App;
