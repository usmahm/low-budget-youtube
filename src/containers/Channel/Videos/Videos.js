import React, {useEffect, useState} from 'react';
import {useParams, withRouter} from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import APIKeys from '../../../shared/APIKeys';

import useSearchHttp from '../../../hooks/useSearchHttp'
// import { useStore } from '../../../store/store';

import VideoCard from '../../../components/VidCard/ChannelVideoCard/ChannelVideoCard';
import LoadingIndicator from '../../../components/UI/LoadingIndicator/LoadingIndicator';

import './Videos.scss'

const Videos = (props) => {
    const [hasMore, setHasMore] = useState(false)
    const { sendSearchRequest, searchData, nextPageToken, totalResults, fetchMoreSearchResult } = useSearchHttp();
    const hardCodedLimit = 150 // Prevent loading more than 150 search results thus making API limit reach time longer

    const channelID = useParams().id;

    useEffect(() => {
        console.log("her")
        sendSearchRequest(`https://www.googleapis.com/youtube/v3/search?key=${APIKeys.key15}&channelId=${channelID}&part=snippet,id&order=date&maxResults=50`)
    }, [channelID, sendSearchRequest])

    useEffect(() => {
        // Checks if first API call has been made thus nextPageToken would have been set for the next API call
        if (totalResults) {
            setHasMore(true)
            console.log(totalResults)
        }
    }, [totalResults])

    const getMoreVideos = () => {
        if (searchData.length > 0) {
            if (searchData.length >= hardCodedLimit || searchData.length >= totalResults) {
                setHasMore(false)
                return;
            }
            if (searchData.length < hardCodedLimit) {
                fetchMoreSearchResult(`https://www.googleapis.com/youtube/v3/search?key=${APIKeys.key16}&channelId=${channelID}&pageToken=${nextPageToken}&part=snippet,id&order=date&maxResults=33`)
            }
        }
    }
    
    
    let videos = <LoadingIndicator type="loadingBox" />

    if (searchData.length > 0) {
        videos = searchData.map((video => <VideoCard key={video.videoId} videoData={video} />))
    }

    return (
        <div className="channel-videos">
            <InfiniteScroll
                    pageStart={0}
                    loadMore={getMoreVideos}
                    hasMore={hasMore}
                    loader={<LoadingIndicator key="spinner" type="spinner" />}
                >
                <main className="videos-wrapper">
                    {videos}
                </main>
            </InfiniteScroll>
            {searchData.length > 0 && searchData.length >= hardCodedLimit ? <p className="page-end__message">You've reached the limit of the displayable channel videos.</p> : null}
        </div>

    )
}

export default withRouter(Videos)