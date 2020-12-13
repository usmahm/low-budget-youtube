import React from 'react'
import { Link } from 'react-router-dom';

import './TrendingVidCard.scss'

const TrendingVidCard = props => {
    const vidData = props.videosData;

    return (
        <Link to={`/watch?videoId=${vidData.videoId}`} className="trending-vid-card">
                <div className="img-container">
                    <div>
                        <img src={vidData.image} alt={vidData.title} />
                        <p className="duration">{vidData.duration}</p>
                    </div>
                </div>
                <div className="details">
                    <h3>{vidData.title}</h3>
                    <p>{vidData.channelName} <span className="s-circle"></span> {vidData.viewCount} <span className="s-circle"></span> {vidData.datePosted}</p>
                    <p>{vidData.description}</p>
                </div>            
        </Link>
    )
}

export default TrendingVidCard
