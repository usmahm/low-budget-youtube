import React, {Fragment} from 'react';


import Avatar from '@material-ui/core/Avatar';
import { NavLink } from 'react-router-dom';

import './Header.scss';

const Header = (props) => {

    let header = <p>Loading...</p>

    let bannerStyle = {}

    if (props.channelDetails) {
        bannerStyle = {
            backgroundImage: `url(${props.channelDetails.banerImage ? props.channelDetails.banerImage : ''})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover"
        }
        header = (
            <Fragment>
                <div className="banner" style={bannerStyle}>
                </div>
                <div className="about">
                    <div className="about-text">
                        <Avatar src={props.channelDetails.channelIcon} className="icon" />
                        <span>
                            <h1>{props.channelDetails.channelName}</h1>
                            <div>
                                <button>
                                    SUBSCRIBE
                                </button>
                                <p>{props.channelDetails.subsriberCount} subscribers</p>
                            </div>
                        </span>
                    </div>
                    <button className="d">
                        SUBSCRIBE
                    </button>
                </div>
                <div className="routes-links">
                    <NavLink to={`/channel/${props.channelDetails.channelID}/videos`} className="route">
                        <p>VIDEOS</p>
                        <span></span>
                    </NavLink>
                    <NavLink to={`/channel/${props.channelDetails.channelID}/about`} className="route">
                        <p>ABOUT</p>
                        <span></span>
                    </NavLink>
                </div>
            </Fragment>

        )
    }

    return (
        <header className="channel-header">
            {header}
        </header>
    )
}

export default Header;