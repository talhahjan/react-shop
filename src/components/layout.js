import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
const Layout = () => {
  useEffect(() => {
    document.querySelector("body").classList.add("wrapper");
    return () => {
      document.querySelector("body").classList.remove("wrapper");
    };
  }, []);
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
