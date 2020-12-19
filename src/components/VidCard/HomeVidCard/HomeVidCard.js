import React from 'react';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import './HomeVidCard.scss'

const HomeVidCard = props => {
    const vidData = props.videosData;

    return (
        <div  className="home-vid-card">
                <Link to={`/watch?videoId=${vidData.videoId}`} className="img-container">
                    <div>
                        <img src={vidData.image} alt={vidData.title} />
                        <p className="duration">{vidData.duration}</p>
                    </div>
                </Link>
                <div className="details">
                    <Link to={`/channel/${vidData.channelID}/videos`} className="c-img">
                        <Avatar src={vidData.channelIcon} className="icon" />
                    </Link>
                    <Link to={`/watch?videoId=${vidData.videoId}`} className="details__text">
                        <h3>{vidData.title}</h3>
                        <span>
                            <p>{vidData.channelName}</p> 
                            <span className="s-circle m"></span>
                            <p>{vidData.viewCount} <span className="s-circle"></span> {vidData.datePosted}</p>
                        </span>
                    </Link>
                </div>
        </div>
    )
}

export default HomeVidCard