import { Switch, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { Stack } from "react-bootstrap";
import { ThemeProvider, createTheme } from "@mui/material";
import Error404 from "./pages/Error404";
import DefaultLayout from "./layouts/DefaultLayout";
import EmptyLayout from "./layouts/EmptyLayout";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#161616",
        dark: "#161616",
        light: "#fdf6f6",
      },
      secondary: {
        main: "#fdf6f6",
        dark: "#fdf6f6",
        light: "#161616",
      },
      background: {
        default: "black",
      },
    },
    unstable_sxConfig: {
      marginX: 0,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/stack" element={<Stack />} />
        </Routes>
      </DefaultLayout>

      <EmptyLayout>
        <Routes>
          <Route path="/404" element={<Error404 />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </EmptyLayout>
    </ThemeProvider>
  );
}

export default App;
