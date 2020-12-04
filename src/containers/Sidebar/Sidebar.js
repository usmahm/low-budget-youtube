import React from "react";
import SidebarCard from '../../components/SidebarCard/SidebarCard';
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
        <nav className="sidenav">
            <SidebarCard selected icon={HomeIcon} title="Home" />
            <SidebarCard icon={WhatshotIcon} title="Trending" />
            <SidebarCard icon={SubscriptionsIcon} title="Subscription" />
            <SidebarCard icon={SubscriptionsIcon} title="Library" />
            <hr />
            <SidebarCard icon={VideoLibraryIcon} title="Library" />
            <SidebarCard icon={HistoryIcon} title="History" />
            <SidebarCard icon={OndemandVideoIcon} title="Your videos" />
            <SidebarCard icon={WatchLaterIcon} title="Watch Later" />
            <SidebarCard icon={ThumbUpAltOutlinedIcon} title="Liked videos" />
            <SidebarCard icon={ExpandMoreOutlinedIcon} title="Show more" />
        </nav>
    );
};

export default Sidebar;
