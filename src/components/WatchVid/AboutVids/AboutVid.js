import React from 'react';
import './AboutVid.scss';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import GetAppIcon from '@material-ui/icons/GetApp';
import Avatar from '@material-ui/core/Avatar';


const AboutVid = React.memo(props => {
    const videoDetails = props.videoDetails
    return (
        <div className="about-video">
            <h2>{videoDetails.title}</h2>
            <div className="top">
                <p>{videoDetails.viewCount} views <span className="s-circle"></span> {videoDetails.datePosted}</p>
                <div className="actions">
                    <span className="upvotes">
                        <ThumbUpIcon className="icon" />
                        {videoDetails.likeCount}
                    </span>
                    <span className="downvotes">
                        <ThumbDownIcon className="icon" />
                        {videoDetails.dislikeCount}
                    </span>
                    <span className="download">
                        <GetAppIcon className="icon" />
                        DOWNLOAD
                    </span>
                </div>
            </div>
            <div className="buttom">
                <div className="channel-details">
                    <div>
                        <Avatar src={videoDetails.channelIcon ? videoDetails.channelIcon : ''} className="icon" />
                        <span>
                            <p className="channel-name">{videoDetails.channelName}</p>
                            <p>{videoDetails.subscriberCount} subscribers</p>
                        </span>
                    </div>
                    <button>SUBSCRIBE</button>
                </div>
                <div className='video-description'>
                    <p>{videoDetails.description}</p>
                </div>
            </div>
        </div>
    )
})

export default AboutVid;