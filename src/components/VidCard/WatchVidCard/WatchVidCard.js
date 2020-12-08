import React from 'react'

import './WatchVidCard.scss'

const WatchVidCard = props => {

    return (
        <div className="watch-vid-card">
            <div className="img-container">
                <div>
                    <img src={props.image} alt={props.title} />
                    <p className="duration">{props.duration}</p>
                </div>
            </div>
            <div className="details">
                <h3>{props.title}</h3>
                <p className="channel__name">{props.channelName}</p>
                <p>{props.viewCount} <span className="s-circle"></span> {props.datePosted}</p>
            </div>
        </div>
    )
}

export default WatchVidCard;