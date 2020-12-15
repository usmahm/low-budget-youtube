import React from "react";

import { Link } from "react-router-dom";
import { useStore } from "../../store/store";
import NavigationItem from "../UI/NavigationItem/NavigationItem";

import "./Sidebar.scss";
import logo from "../../assets/icons/logo.svg";

import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import HistoryIcon from "@material-ui/icons/History";
import OndemandVideoIcon from "@material-ui/icons/OndemandVideo";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";

const Sidebar = (props) => {
  const [state, dispatch] = useStore();

  const toggleSideDrawer = () => {
    if (props.sideNav) {
      dispatch("TOGGLE_SIDE_NAV");
    }
  };

  let navs = (
    <ul>
      <NavigationItem
        exact
        link="/"
        class={`${props.class}-item`}
        icon={HomeIcon}
        title="Home"
      />
      <NavigationItem
        link="/trending"
        class={`${props.class}-item`}
        icon={WhatshotIcon}
        title="Trending"
      />
      <NavigationItem
        link="/subscription"
        class={`${props.class}-item`}
        icon={SubscriptionsIcon}
        title="Subscription"
      />
      <hr />
      <NavigationItem
        link="/library"
        class={`${props.class}-item`}
        icon={VideoLibraryIcon}
        title="Library"
      />
      <NavigationItem
        link="/history"
        class={`${props.class}-item`}
        shouldHideOnTabPort={props.mainNav}
        icon={HistoryIcon}
        title="History"
      />
      <NavigationItem
        link="/your-videos"
        class={`${props.class}-item`}
        shouldHideOnTabPort={props.mainNav}
        icon={OndemandVideoIcon}
        title="Your videos"
      />
      <NavigationItem
        link="/watch-later"
        class={`${props.class}-item`}
        shouldHideOnTabPort={props.mainNav}
        icon={WatchLaterIcon}
        title="Watch Later"
      />
      <NavigationItem
        link="/liked-videos"
        class={`${props.class}-item`}
        shouldHideOnTabPort={props.mainNav}
        icon={ThumbUpAltOutlinedIcon}
        title="Liked videos"
      />
      <NavigationItem
        link="/liked-videos"
        class={`${props.class}-item`}
        shouldHideOnTabPort={props.mainNav}
        icon={ExpandMoreOutlinedIcon}
        title="Show more"
      />
    </ul>
  );

  let sideNavHeader = null;

  if (props.sideNav) {
    sideNavHeader = (
      <div className="header__left">
        <span onClick={toggleSideDrawer}>
          <MenuIcon className="icon" />
        </span>
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
    );
  }

  return (
    <nav className={`${props.class} ${state.globalState.isMainNavSmall ? 's' : ''}`} onClick={toggleSideDrawer}>
      {sideNavHeader}
      {navs}
    </nav>
  );
};

export default Sidebar;
