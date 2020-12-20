import React, { useEffect, useState } from "react";

import InfiniteScroll from 'react-infinite-scroller';
import { useStore } from '../../store/store'
import useHttp from "../../hooks/useHttp";
import useSearchHttp from "../../hooks/useSearchHttp";
import APIKeys from '../../shared/APIKeys';

import WatchVidCard from "../../components/VidCard/WatchVidCard/WatchVidCard";
import AboutVid from "../../components/WatchVid/AboutVids/AboutVid";
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';

import "./WatchVid.scss";

const WatchVid = React.memo((props) => {
  const [hasMore, setHasMore] = useState(false)
  const hardCodedLimit = 75 // Prevent loading more than 75 search results thus making API limit reach time longer
  const { sendRequest, data, reqExtra } = useHttp();
  const { sendSearchRequest, searchData, resetSearchState, totalResults, nextPageToken, fetchMoreSearchResult } = useSearchHttp();
  const [ state, dispatch ] = useStore();

  const relatedVideos = searchData;
  const videoDetails = state.watchVidPage.videoDetails;
  const isVidDetailsFetched = state.watchVidPage.isVidDetailsFetched;
  const isOtherVidDetailsFetched = state.watchVidPage.isOtherVidDetailsFetched;
  const channelID = state.watchVidPage.videoDetails ? state.watchVidPage.videoDetails.channelID : null;

  let videoId = new URLSearchParams(props.location.search).get('videoId');
  let CORSAnywhereURL = "https://cors-anywhere.herokuapp.com/";
  CORSAnywhereURL = "";

  // Handles all first request to the server
  useEffect(() => {
    if (!isVidDetailsFetched) {
      // FETCHES DATA FOR VIDEO
      sendRequest(
        `${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${APIKeys.key7}`
      );
      // FETCHES DATA FOR RELATED VIDEOS SECTION
      sendSearchRequest(`${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&maxResults=20&type=video&key=${APIKeys.key8}`)
      dispatch('SET_WVID_DATA_IS_FETCHED', {isVidDetailsFetched: true})
    } else if (!isOtherVidDetailsFetched && channelID) {
      // FETCHES DATA FOR VIDEO CHANNEL's DETAILS
      sendRequest(
        `${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${channelID}&key=${APIKeys.key9}`,
        {
          identifier: "GET_WVID_CHANNEL_DATA",
        }
      );
      dispatch('SET_WVID_DATA_IS_FETCHED', {isOtherVidDetailsFetched: true})
    }
  }, [sendRequest, sendSearchRequest, videoId, CORSAnywhereURL, isVidDetailsFetched, channelID, dispatch, isOtherVidDetailsFetched]);

  useEffect(() => {
    if (data) {
      if (!reqExtra) {
        dispatch('SET_WVID_PAGE_VIDEO_DETAILS', data)
      } else if (reqExtra.identifier === "GET_WVID_CHANNEL_DATA") {
        dispatch('SET_WVID_CHANNEL_DETAILS', data)
      }
    }
  }, [data, reqExtra, dispatch, CORSAnywhereURL, sendRequest, videoId]);

  useEffect(() => {
    return () => {
      dispatch('RESET_WDIV_STATE')
      resetSearchState()
    }
  }, [dispatch, videoId, resetSearchState])

  
  useEffect(() => {
    // Checks if first API call has been made thus nextPageToken would have been set for the next API call
    if (totalResults) {
      setHasMore(true)
    }
  }, [totalResults])

  const getMoreVideos = () => {
    if (searchData.length > 0) {
        if (searchData.length >= hardCodedLimit) {
            setHasMore(false)
            return;
        }
        if (searchData.length < hardCodedLimit) {
            fetchMoreSearchResult(`${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&maxResults=20&type=video&pageToken=${nextPageToken}&key=${APIKeys.key10}`)
        }
    }
}


  return (
    <div className="watchvid-page">
      <div className="video">
        <div className="video__container">
          <div className="video__container-i">
            <div>
              <iframe
                title="name"
                src={`//www.youtube.com/embed/${videoId}?autoplay=1`} // ADD Later ?autoplay=1&mute=1
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="video__details">
          {videoDetails ? <AboutVid videoDetails={videoDetails} /> : null}
        </div>
      </div>
      <div className="related-videos">
        <InfiniteScroll
          pageStart={0}
          loadMore={getMoreVideos}
          hasMore={hasMore}
          loader={<LoadingIndicator key="spinner" type="spinner" />}
        >
          <div className="videos-wrapper">
            {relatedVideos ? relatedVideos.map((videoData) => <WatchVidCard key={videoData.videoId} videoDetails={videoData} />): <LoadingIndicator type="loadingBox" top='0' />}
          </div>
        </InfiniteScroll>
        {searchData.length > 0 && searchData.length >= hardCodedLimit ? <p className="page-end__message">You've reached this end of the related videos.</p> : null}
      </div>
    </div>
  );
});

export default WatchVid;
