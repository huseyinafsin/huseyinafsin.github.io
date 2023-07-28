
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import About from './pages/About';
import Home from './pages/Home';
import Contact from './pages/Contact';
import { Stack } from 'react-bootstrap';
import { createContext, useState } from 'react';

export const ThemeContext =createContext(null);

function App() {
  
  const [theme, setTheme] = useState("dark-theme");

  const toggleTheme =()=>{
    setTheme ( (curr) => (curr==="dark-theme" ? "light-theme" : "dark-theme"))
  }
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
    <div id={theme} className={"container"}>
      <Sidebar/>
      <div className="main">
      <div className="content-wrap">
      <div className="content">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/stack' element={<Stack/>} />
            <Route path="*" element={"404"} />
          </Routes>
        </BrowserRouter>
      </div>
      </div>
      <Footer/>
      </div>
    </div>
    </ThemeContext.Provider>

  );
}

export default App;


