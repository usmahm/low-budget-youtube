import React, { useEffect} from "react";

import useVideoHttp from '../../hooks/useVideoHttp';

import TrendingVidCard from "../../components/VidCard/TrendingVidCard/TrendingVidCard";
import LoadingIndicator from '../../components/UI/LoadingIndicator/LoadingIndicator';
import "./Trending.scss";

const Trending = (props) => {
  const { data, sendVideosRequest} = useVideoHttp();

  const APIKey = "AIzaSyBQYPwOPrbiFmiafbPOKlxQsieNuMV31yI"; // Key 2
  let CORSAnywhereURL = "https://cors-anywhere.herokuapp.com/";
  const regionCode = "NG";
  CORSAnywhereURL = "";


  useEffect(() => {
    sendVideosRequest(`${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&chart=mostPopular&maxResults=20&regionCode=${regionCode}&key=${APIKey}`);
  }, [CORSAnywhereURL, APIKey, sendVideosRequest])

  let videos = <LoadingIndicator />

  if (data) {
    videos = data.map((vidData) => (
      <TrendingVidCard key={vidData.videoId} videosData={vidData} />
    ))
  }

  return (
    <div className="trending">
      {videos}
    </div>
  );
};

export default Trending;
