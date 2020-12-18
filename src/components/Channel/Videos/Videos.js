import React from 'react'

import { useStore } from '../../../store/store';

import VideoCard from './VideoCard/VideoCard';
// import LoadingIndicator from '../../UI/LoadingIndicator/LoadingIndicator';

import './Videos.scss'

const Videos = (props) => {
    const [state] = useStore();

    console.log(state.channelPage.channelVideos)

    let videos = null

    if (state.channelPage.channelVideos) {
        videos = state.channelPage.channelVideos.map((video => <VideoCard key={video.videoId} videoData={video} />))
    }

    return (
        <main className="channel-videos">
            {videos}
        </main>
    )
}

export default Videos