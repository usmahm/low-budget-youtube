import React, { } from 'react';

import { Link } from "react-router-dom";
import { parseText } from '../../../shared/utilities';

import './ChannelVideoCard.scss';

const VideoCard = props => {
    const vidData = props.videoData

    return (
            <Link to={`/watch?videoId=${vidData.videoId}`} className="channel-vid-card">
                    <div className="img-container">
                        <div>
                            <img src={vidData.image} alt={vidData.title} />
                            <p className="duration">{vidData.duration}</p>
                        </div>
                    </div>
                    <div className="details">
                        <div className="details__text">
                            <h3>{parseText(vidData.title, 45)}</h3>
                            <p>{vidData.viewCount} <span className="s-circle"></span> {vidData.datePosted}</p>
                        </div>
                    </div>
            </Link>
    );
}

export default VideoCard;