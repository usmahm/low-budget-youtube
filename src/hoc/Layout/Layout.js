import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import './Layout.scss'

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(true);
  let isPathnameWatch = useLocation().pathname === "/watch";
  console.log(isPathnameWatch)

  useEffect(() => {
    if (isPathnameWatch) {
        setShowSideDrawer(false)
    }
  }, [isPathnameWatch])

  const toggleSideDrawer = () => {
    setShowSideDrawer(!showSideDrawer)
  }

  return (
    <div className={`layout ${showSideDrawer ? 'open' : ''} ${isPathnameWatch ? 'close' : ''}`}>
      <Header sideDrawerToggle={toggleSideDrawer} />
      {!isPathnameWatch ? <Sidebar isOpen={showSideDrawer} /> : null}
      <main>{props.children}</main>
    </div>
  );
};

export default Layout