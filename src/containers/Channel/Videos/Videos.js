import React from 'react'

import { useStore } from '../../../store/store';

import VideoCard from '../../../components/VidCard/ChannelVideoCard/ChannelVideoCard';
import LoadingIndicator from '../../../components/UI/LoadingIndicator/LoadingIndicator';

import './Videos.scss'

const Videos = (props) => {
    const [state] = useStore();

    console.log(state.channelPage.channelVideos)

    let videos = <LoadingIndicator type="loadingBox" />

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