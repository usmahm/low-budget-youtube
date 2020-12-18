import React, { useEffect } from "react";

import { useStore } from '../../store/store'
import useHttp from "../../hooks/useHttp";
import useSearchHttp from "../../hooks/useSearchHttp";

import WatchVidCard from "../../components/VidCard/WatchVidCard/WatchVidCard";
import AboutVid from "../../components/WatchVid/AboutVids/AboutVid";
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';

import "./WatchVid.scss";

const WatchVid = React.memo((props) => {
  const { sendRequest, data, reqExtra } = useHttp();
  const { sendSearchRequest, searchData, resetSearchState } = useSearchHttp();
  const [ state, dispatch ] = useStore();

  const relatedVideos = searchData;
  const videoDetails = state.watchVidPage.videoDetails;
  const isVidDetailsFetched = state.watchVidPage.isVidDetailsFetched;
  const isOtherVidDetailsFetched = state.watchVidPage.isOtherVidDetailsFetched;
  const channelID = state.watchVidPage.videoDetails ? state.watchVidPage.videoDetails.channelID : null;

  let videoId = new URLSearchParams(props.location.search).get('videoId');
  let APIKey = "AIzaSyAI3frSXVHODo5CIamVABLPp4hZM0elCkw"; // Key 7
  APIKey = 'AIzaSyD-o-aKL9q8Zh25uYSRZAj-KQQu8UVHFY4'
  let CORSAnywhereURL = "https://cors-anywhere.herokuapp.com/";
  CORSAnywhereURL = "";

  // Sends Request to the server
  useEffect(() => {
    if (!isVidDetailsFetched) {
      // FETCHES DATA FOR VIDEO
      sendRequest(
        `${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${APIKey}`
      );
      // FETCHES DATA FOR RELATED VIDEOS SECTION
      sendSearchRequest(`${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&maxResults=20&type=video&key=${APIKey}`)
      dispatch('SET_WVID_DATA_IS_FETCHED', {isVidDetailsFetched: true})
    } else if (!isOtherVidDetailsFetched && channelID) {
      // FETCHES DATA FOR VIDEO CHANNEL DETAILS
      sendRequest(
        `${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${channelID}&key=${APIKey}`,
        {
          identifier: "GET_WVID_CHANNEL_DATA",
        }
      );
      dispatch('SET_WVID_DATA_IS_FETCHED', {isOtherVidDetailsFetched: true})
    }
  }, [sendRequest, sendSearchRequest, videoId, APIKey, CORSAnywhereURL, isVidDetailsFetched, channelID, dispatch, isOtherVidDetailsFetched]);

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

  return (
    <div className="watchvid-page">
      <div className="video">
        <div className="video__container">
          <div className="video__container-i">
            <div>
              <iframe
                title="name"
                src={`//www.youtube.com/embed/${videoId}`} // ADD Later ?autoplay=1&mute=1
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
        {relatedVideos ? relatedVideos.map((videoData) => <WatchVidCard key={videoData.videoId} videoDetails={videoData} />): <LoadingIndicator top='0' />}
      </div>
    </div>
  );
});

export default WatchVid;
