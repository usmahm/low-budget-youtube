import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

import { parseText } from '../../../shared/utilities'
import Avatar from '@material-ui/core/Avatar';

import './TrendingVidCard.scss'

const TrendingVidCard = props => {
    const detailsDiv = useRef()
    const vidData = props.videosData;
    let [noOfDescChars, setNoOfDescChars] = useState(0);
    const [noOfTitleChars, setNoOfTitleChars] = useState(0)

    useEffect(() => {
        console.log(detailsDiv.current.offsetWidth)
        setNoOfDescChars(detailsDiv.current.offsetWidth / 3.5)
        setNoOfTitleChars(detailsDiv.current.offsetWidth / 3.5)
        
        if (detailsDiv.current.offsetWidth < 292) {
            setNoOfDescChars(detailsDiv.current.offsetWidth / 5)
            setNoOfTitleChars(detailsDiv.current.offsetWidth / 7)
        }
    }, [])

    return (
        <Link to={`/watch?videoId=${vidData.videoId}`} className="trending-vid-card">
                <div className="img-container">
                    <div>
                        <img src={vidData.image} alt={vidData.title} />
                        <p className="duration">{vidData.duration}</p>
                    </div>
                </div>
                <div className="details" ref={detailsDiv}>
                    <div className="c-img">
                        <Avatar src={vidData.channelIcon} className="icon" />
                    </div>
                    <div className="details__text">
                        <h3>{parseText(vidData.title, noOfTitleChars)}</h3>
                        <p>{vidData.channelName} <span className="s-circle"></span> {vidData.viewCount} <span className="s-circle"></span> {vidData.datePosted}</p>
                        <p>{parseText(vidData.description, noOfDescChars)}</p>
                    </div>
                </div>            
        </Link>
    )
}

export default TrendingVidCard
