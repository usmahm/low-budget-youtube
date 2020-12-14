import React, { useEffect } from "react";

import { useStore } from '../../store/store';
import { useLocation } from 'react-router-dom';

import Header from "../../containers/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import './Layout.scss'

const Layout = (props) => {
  let isPathnameWatch = useLocation().pathname === "/watch";
  const  dispatch = useStore()[0];

  useEffect(() => {
    if (isPathnameWatch) {
        dispatch('TOGGLE_SIDE_DRAWER', false)
    }
  }, [isPathnameWatch, dispatch])

  return (
    <div className={`layout`}>
      <Header />
      <div className="main-nav">
        <Sidebar mainNav />
      </div>
      <div className="side-nav">
        <Sidebar />
      </div>
      <main>{props.children}</main>
    </div>
  );
};

export default Layout