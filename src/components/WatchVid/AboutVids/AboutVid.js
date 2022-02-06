import React from 'react';
import './AboutVid.scss';

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import GetAppIcon from '@material-ui/icons/GetApp';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';


const AboutVid = React.memo(props => {
    const videoDetails = props.videoDetails
    
    return (
        <div className="about-video">
            <h2>{videoDetails.title}</h2>
            <div className="top">
                <p>{videoDetails.viewCount} views <span className="s-circle"></span><span className="date-posted">{videoDetails.datePosted}</span></p>
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
                        <Link to={`/channel/${videoDetails.channelID}/videos`}>
                            <Avatar src={videoDetails.channelIcon ? videoDetails.channelIcon : ''} className="icon" />
                        </Link>
                        <span>
                            <p className="channel-name">{videoDetails.channelName}</p>
                            <p>
                                {videoDetails.subscriberCount}&nbsp;
                                { videoDetails.subscriberCount !== 'HIDDEN' && <span>subscribers</span>}
                            </p>
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