import React, { useEffect } from "react";

import useVideoHttp from '../../hooks/useVideoHttp';

import HomeVidCard from "../../components/VidCard/HomeVidCard/HomeVidCard";
import Spinner from '../../components/UI/Spinner/Spinner';
import "./Home.scss";

const MainPage = (props) => {
  const { data, sendVideosRequest } = useVideoHttp()

  // let CORSAnywhereURL = "https://cors-anywhere.herokuapp.com/";
  let APIKey = 'AIzaSyC0-Cu83uFnN2GDL04ISyf8NO674ElR2P8' // Key 1
  const regionCode = "NG";
  // CORSAnywhereURL = "";

  // Handles request to the server
  useEffect(() => {
      sendVideosRequest(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&chart=mostPopular&maxResults=40&regionCode=${regionCode}&key=${APIKey}`)
  }, [APIKey, sendVideosRequest]);

  let videos = <Spinner />

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
