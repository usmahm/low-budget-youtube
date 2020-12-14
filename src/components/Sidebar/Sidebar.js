import React from "react";

import { useStore } from '../../store/store';
import NavigationItem from '../UI/NavigationItem/NavigationItem';
import './Sidebar.scss'

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
    const state = useStore()[0];

    let navs = (
        <ul>
            <NavigationItem exact link="/" canReduceWidth={props.mainNav} icon={HomeIcon} title="Home" />
            <NavigationItem link="/trending" canReduceWidth={props.mainNav} icon={WhatshotIcon} title="Trending" />
            <NavigationItem link="/subscription" canReduceWidth={props.mainNav} icon={SubscriptionsIcon} title="Subscription" />
            <hr />
            <NavigationItem link="/library" canReduceWidth={props.mainNav} icon={VideoLibraryIcon} title="Library" />
            <NavigationItem link="/history" shouldHideOnTabPort={props.mainNav} icon={HistoryIcon} title="History" />
            <NavigationItem link="/your-videos" shouldHideOnTabPort={props.mainNav} icon={OndemandVideoIcon} title="Your videos" />
            <NavigationItem link="/watch-later" shouldHideOnTabPort={props.mainNav} icon={WatchLaterIcon} title="Watch Later" />
            <NavigationItem link="/liked-videos" shouldHideOnTabPort={props.mainNav} icon={ThumbUpAltOutlinedIcon} title="Liked videos" />
            <NavigationItem link="/liked-videos" shouldHideOnTabPort={props.mainNav} icon={ExpandMoreOutlinedIcon} title="Show more" />
        </ul>
    )

  return (
      <nav className={`sidenav ${state.globalState.isShowSideDrawer ? 'open' : ''} ${props.mainNav ? 'main-na' : ''}`}>
        {navs}
      </nav>
    );
};

export default Sidebar;
