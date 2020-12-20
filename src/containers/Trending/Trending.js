import React, { useEffect, useState} from "react";
import InfiniteScroll from 'react-infinite-scroller';
import APIKeys from '../../shared/APIKeys';

import useVideoHttp from '../../hooks/useVideoHttp';
import { useStore } from '../../store/store';

import TrendingVidCard from "../../components/VidCard/TrendingVidCard/TrendingVidCard";
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import "./Trending.scss";

const Trending = (props) => {
  const [hasMore, setHasMore] = useState(false)
  const { data, sendVideosRequest, fetchMoreVideos, nextPageToken, totalResults} = useVideoHttp();
  const state = useStore()[0]

  const regionCode = state.globalState.countryCode;

  // Handles first request to the server
  useEffect(() => {
    if (regionCode) {
      sendVideosRequest(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&chart=mostPopular&maxResults=20&regionCode=${regionCode}&key=${APIKeys.key3}`);
    }
  }, [regionCode, sendVideosRequest])

  useEffect(() => {
    // Checks if first API call has been made thus nextPageToken would have been set for the next API call
    if (totalResults) {
      setHasMore(true)
    }
  }, [totalResults])

  const getMoreVideos = () => {
    if (data.length > 0) {
      if (data.length >= totalResults) {
        setHasMore(false)
        return
      }
      if (data.length < totalResults) {
        fetchMoreVideos(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&chart=mostPopular&maxResults=40&regionCode=${regionCode}&pageToken=${nextPageToken}&key=${APIKeys.key4}`)
      }
    }
  }

  let videos = <LoadingIndicator />

  if (data.length > 0) {
    videos = data.map((vidData) => (
      <TrendingVidCard key={vidData.videoId} videosData={vidData} />
    ))
  }

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={getMoreVideos}
      hasMore={hasMore}
      loader={<LoadingIndicator key="spinner" type="spinner" />}
    >
      <main className="trending">
        {videos}
      </main>
      {data.length > 0 && data.length >= totalResults ? <p className="page-end__message">You've reached this end of the page.</p> : null}
    </InfiniteScroll>
  );
};

export default Trending;
