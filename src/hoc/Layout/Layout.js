import React from "react";

import { useStore } from '../../store/store';
import { useLocation } from 'react-router-dom';

import Header from "../../containers/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";

import './Layout.scss'

const Layout = (props) => {
  let isPathnameWatch = useLocation().pathname === "/watch";
  const  [state, dispatch] = useStore();

  const closeBackdrop = () => {
      dispatch('TOGGLE_SIDE_NAV')
  }

  let mainNav = (
    <div className={`main-nav ${state.globalState.isMainNavSmall ? 's' : ''}`}>
        <Sidebar mainNav class="main-nav__list" />
    </div>
  )

  if (isPathnameWatch) {
    mainNav = null
  }

  return (
    <div className={`layout ${state.globalState.isMainNavSmall && !isPathnameWatch ? 's-p' : ''} ${isPathnameWatch ? 'no-padding' : ""}`}>
      <div className={`backdrop  ${state.globalState.isShowSideNav ? 'show' : ''}`} onClick={closeBackdrop}></div>
      <Header />
      {mainNav}
      <div className={`side-nav ${state.globalState.isShowSideNav ? 'show' : ''} ${isPathnameWatch ? 's-w' : ''}`}>
        <Sidebar sideNav class="side-nav__list" />
      </div>
      <main>{props.children}</main>
    </div>
  );
};

export default Layout