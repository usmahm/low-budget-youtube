import React, { useEffect } from "react";

import useVideoHttp from '../../hooks/useVideoHttp';
import { useStore } from '../../store/store';

import HomeVidCard from "../../components/VidCard/HomeVidCard/HomeVidCard";
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import "./Home.scss";

const MainPage = (props) => {
  const { data, sendVideosRequest } = useVideoHttp();
  const state = useStore()[0]

  // let CORSAnywhereURL = "https://cors-anywhere.herokuapp.com/";
  let APIKey = 'AIzaSyC0-Cu83uFnN2GDL04ISyf8NO674ElR2P8' // Key 1
  const regionCode = state.globalState.countryCode;
  // CORSAnywhereURL = "";

  // Handles request to the server
  useEffect(() => {
      if (regionCode) {
        sendVideosRequest(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&chart=mostPopular&maxResults=40&regionCode=${regionCode}&key=${APIKey}`)
      }
  }, [APIKey, regionCode, sendVideosRequest]);

  let videos = <LoadingIndicator />

  if (data) {
    videos = data.map((vidData) => (
      <HomeVidCard key={vidData.videoId} videosData={vidData} />
    ))
  }

  return (
    <main className="home">
      {videos}
    </main>
  );
};

export default MainPage;
