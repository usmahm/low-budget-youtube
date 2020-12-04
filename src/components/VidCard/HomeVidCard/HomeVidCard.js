import React from 'react';

import Avatar from '@material-ui/core/Avatar';
import './HomeVidCard.scss'

const HomeVidCard = props => {
    const vidData = props.videosData;
    console.log(vidData)
    console.log(vidData.videoId)

    return (
        <div className="home-vid-card">
            <div className="img-container">
                <div>
                    <img src={`https://img.youtube.com/vi/${vidData.videoId}/mqdefault.jpg`} alt={vidData.title} />
                    <p className="duration">{vidData.duration}</p>
                </div>
            </div>
            <div className="details">
                <div className="c-img">
                    <Avatar className="icon" />
                </div>
                <div className="details__text">
                    <h3>{vidData.title}</h3>
                    <p>{vidData.channelName}</p>
                    <p>{vidData.viewCount} <span className="s-circle"></span> {vidData.datePosted}</p>
                </div>
            </div>
        </div>
    )
}

export default HomeVidCard