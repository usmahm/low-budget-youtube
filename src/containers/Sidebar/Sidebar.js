import React from "react";
// import { BrowserRouter, Link} from 'react-router-dom';
import NavigationItem from '../../components/UI/NavigationItem/NavigationItem';
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

const Sidebar = () => {
  return (
        <ul className="sidenav">
            <NavigationItem exact link="/" icon={HomeIcon} title="Home" />
            <NavigationItem link="/trending" icon={WhatshotIcon} title="Trending" />
            <NavigationItem link="/subscription" icon={SubscriptionsIcon} title="Subscription" />
            <hr />
            <NavigationItem link="/library" icon={VideoLibraryIcon} title="Library" />
            <NavigationItem link="/history" icon={HistoryIcon} title="History" />
            <NavigationItem link="/your-videos" icon={OndemandVideoIcon} title="Your videos" />
            <NavigationItem link="/watch-later" icon={WatchLaterIcon} title="Watch Later" />
            <NavigationItem link="/liked-videos" icon={ThumbUpAltOutlinedIcon} title="Liked videos" />
            <NavigationItem link="/liked-videos" icon={ExpandMoreOutlinedIcon} title="Show more" />
        </ul>
    );
};

export default Sidebar;
