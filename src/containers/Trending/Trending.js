import React, { useEffect, useState} from "react";
import InfiniteScroll from 'react-infinite-scroller';

import useVideoHttp from '../../hooks/useVideoHttp';
import { useStore } from '../../store/store';

import TrendingVidCard from "../../components/VidCard/TrendingVidCard/TrendingVidCard";
import RequestErrorHandler from '../../hoc/RequestErrorHandler/RequestErrorHandler';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import "./Trending.scss";

const Trending = (props) => {
  const [hasMore, setHasMore] = useState(false)
  const { data, sendVideosRequest, fetchMoreVideos, error, nextPageToken, totalResults} = useVideoHttp();
  const state = useStore()[0]

  const regionCode = state.globalState.countryCode;
  const cantFetch = state.globalState.cantFetch;

  // Handles first request to the server
  useEffect(() => {
    if (regionCode || cantFetch) {
      sendVideosRequest(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&chart=mostPopular&maxResults=20&regionCode=${regionCode}&key=${process.env.REACT_APP_KEY_3}`);
    }
  }, [regionCode, sendVideosRequest, cantFetch])

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
        fetchMoreVideos(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&chart=mostPopular&maxResults=40&regionCode=${regionCode}&pageToken=${nextPageToken}&key=${process.env.REACT_APP_KEY_4}`)
      }
    }
  }

  let videos = <LoadingIndicator />

  if (data.length > 0) {
    videos = data.map((vidData) => (
      <TrendingVidCard key={vidData.videoId} videosData={vidData} />
    ))
  }

  if (data.length === 0 && error) {
    if (error.status === 403) {
      videos = (
        <RequestErrorHandler>
          <p>Can't Load Videos at the moment.</p>
          <p>Try Reloading the page after some time.</p>
        </RequestErrorHandler>
      ) 
    }
  }

  return (
    <main className="trending">
      <InfiniteScroll
        pageStart={0}
        loadMore={getMoreVideos}
        hasMore={hasMore}
        loader={<LoadingIndicator key="spinner" type="spinner" />}
      >
        <div className="videos-wrapper">
          {videos}
        </div>
      </InfiniteScroll>
      {data.length > 0 && data.length >= totalResults ? <p className="page-end__message">You've reached this end of this page.</p> : null}
    </main>
  );
};

export default Trending;
