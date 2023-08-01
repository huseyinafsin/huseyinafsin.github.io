import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function DefaultLayout({children}) {
  return (
    <>
      <div id="dark-theme" className={"container"}>
        <Sidebar />
        <div className="main">
          <Navbar />
          <div className="content-wrap">
            <div className="content">
                {children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
export default DefaultLayout;
