import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroller';

import useVideoHttp from '../../hooks/useVideoHttp';
import { useStore } from '../../store/store';

import HomeVidCard from "../../components/VidCard/HomeVidCard/HomeVidCard";
import RequestErrorHandler from '../../hoc/RequestErrorHandler/RequestErrorHandler';
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import "./Home.scss";

const MainPage = (props) => {
  const [hasMore, setHasMore] = useState(false)
  const { data, sendVideosRequest, nextPageToken, error, totalResults, fetchMoreVideos } = useVideoHttp();
  const state = useStore()[0]

  const regionCode = state.globalState.countryCode;
  const cantFetch = state.globalState.cantFetch;
  console.log(regionCode)

  // Handles first request to the server
  useEffect(() => {
      if (regionCode || cantFetch) {
        sendVideosRequest(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&chart=mostPopular&maxResults=48&regionCode=${regionCode}&key=${process.env.REACT_APP_KEY_1}`)
      }
  }, [regionCode, sendVideosRequest, cantFetch]);
  
  useEffect(() => {
    // Checks if first API call has been made thus nextPageToken would have been set for the next API call
    if (totalResults) {
      setHasMore(true)
    }
  }, [totalResults])

  const getMoreVideos = () => {
    if (data.length > 0) {
      if (data.length >= totalResults) {
        setHasMore(false);
        return;
      }
      if (data.length < totalResults) {
        fetchMoreVideos(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&chart=mostPopular&maxResults=48&regionCode=${regionCode}&pageToken=${nextPageToken}&key=${process.env.REACT_APP_KEY_2}`)
      }
    } 
  }
  
  let videos = <LoadingIndicator />
  
  if (data.length > 0) {
    videos = data.map((vidData) => (
      <HomeVidCard key={vidData.videoId} videosData={vidData} />
    ))
  }

  if (data.length === 0 && error) {
    if (error.status === 403) {
      videos = (
        <RequestErrorHandler>
          <p>Can't load videos at the moment.</p>
          <p>Try reloading the page after some time.</p>
        </RequestErrorHandler>
      ) 
    }
  }

  return (
      <main className="home-main">
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

export default MainPage;
