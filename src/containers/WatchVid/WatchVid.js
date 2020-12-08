import React from 'react';

import WatchVidCard from '../../components/VidCard/WatchVidCard/WatchVidCard';
// import VideoPlayer from ''

import './WatchVid.scss'

const WatchVid = props => {
    return (
        <div className='watchvid-page'>
            <div className="video">
                <div className="video__container">
                
                </div>
                <div className="video__details">

                </div>
            </div>
            <div className="related-videos">
                {props.videosData.map(videoData => <WatchVidCard {...videoData} />)}
            </div>
        </div>
    )
}

export default WatchVid;