import React from 'react'

import './WatchVidCard.scss'

const WatchVidCard = props => {
    const videoDetails = props.videoDetails

    return (
        <div className="watch-vid-card">
            <div className="img-container">
                <div>
                    <img src={videoDetails.image} alt={videoDetails.title} />
                    <p className="duration">{videoDetails.duration}</p>
                </div>
            </div>
            <div className="details">
                <h3>{videoDetails.title}</h3>
                <p className="channel__name">{videoDetails.channelName}</p>
                <p>{videoDetails.viewCount} <span className="s-circle"></span> {videoDetails.datePosted}</p>
            </div>
        </div>
    )
}

export default WatchVidCard;