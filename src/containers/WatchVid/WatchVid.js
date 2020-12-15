import React, { useEffect } from "react";

import { useStore } from '../../store/store'
import useHttp from "../../hooks/useHttp";

import WatchVidCard from "../../components/VidCard/WatchVidCard/WatchVidCard";
import AboutVid from "../../components/WatchVid/AboutVids/AboutVid";

import "./WatchVid.scss";

const WatchVid = React.memo((props) => {
  const { sendRequest, data, reqExtra } = useHttp();
  const [ state, dispatch ] = useStore();

  const videoDetails = state.watchVidPage.videoDetails;
  const relatedVideos = state.watchVidPage.relatedVideos
  const isVidDetailsFetched = state.watchVidPage.isVidDetailsFetched;
  const isOtherVidDetailsFetched = state.watchVidPage.isOtherVidDetailsFetched;
  const relatedVidsId = state.watchVidPage.relatedVidsId;
  const channelID = state.watchVidPage.videoDetails ? state.watchVidPage.videoDetails.channelID : null;

  let videoId = new URLSearchParams(props.location.search).get('videoId');

  const APIKey = "AIzaSyAqeL-FB6D4o0Yd7MDEbrMSHxQR3aA5ZsA"; // Key 3
  let CORSAnywhereURL = "https://cors-anywhere.herokuapp.com/";
  CORSAnywhereURL = "";

  useEffect(() => {
    if (!isVidDetailsFetched) {
      sendRequest(
        `${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${APIKey}`
      );
      dispatch('SET_WVID_DATA_IS_FETCHED', {isVidDetailsFetched: true})
    } else if (!isOtherVidDetailsFetched && channelID) {
      console.log(channelID)
      sendRequest(
        `${CORSAnywhereURL}https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelID}&key=${APIKey}`,
        {
          identifier: "SUBSCRIBER_COUNT",
        }
      );
      sendRequest(
        `${CORSAnywhereURL}https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelID}&fields=items(id%2Csnippet%2Fthumbnails)&key=${APIKey}`,
        {
          identifier: "GET_CHANNEL_ICON",
        }
      );
      sendRequest(
        `${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&maxResults=20&type=video&key=${APIKey}`,
        {
          identifier: "RELATED_VIDEOS",
        }
      );
      dispatch('SET_WVID_DATA_IS_FETCHED', {isOtherVidDetailsFetched: true})
    } else if (relatedVidsId) {
      sendRequest(
        `https://youtube.googleapis.com/youtube/v3/videos?part=statistics%2CcontentDetails&id=${relatedVidsId.join(",")}&key=${APIKey}`,
        {
          identifier: "GET_RELATED_VIDEOS_DATA",
        }
      );
    }
  }, [sendRequest, videoId, APIKey, CORSAnywhereURL, isVidDetailsFetched, channelID, dispatch, isOtherVidDetailsFetched, relatedVidsId]);

  useEffect(() => {
    if (data) {
      if (!reqExtra) {
        dispatch('SET_WVID_PAGE_VIDEO_DETAILS', data)
      } else if (reqExtra.identifier === "SUBSCRIBER_COUNT") {
        dispatch('SET_SUBSCRIBER_COUNT', data)
      } else if (reqExtra.identifier === "GET_CHANNEL_ICON") {
        dispatch('SET_WVID_CHANNEL_ICON', data)
      } else if (reqExtra.identifier === "RELATED_VIDEOS") {
        dispatch('SET_WVID_RELATED_VIDS', data)
      } else if (reqExtra.identifier === "GET_RELATED_VIDEOS_DATA") {
        dispatch('SET_WVID_RELATED_VIDS_VIEW_COUNT', data)
      }
    }
  }, [data, reqExtra, dispatch, CORSAnywhereURL, sendRequest, videoId]);

  useEffect(() => {
    return () => {
      dispatch('RESET_WDIV_STATE')
    }
  }, [dispatch])

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
        {relatedVideos ? relatedVideos.map((videoData) => <WatchVidCard key={videoData.videoId} videoDetails={videoData} />): null}
      </div>
    </div>
  );
});

export default WatchVid;
