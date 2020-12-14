import React, { useEffect} from "react";

import { useStore } from '../../store/store';
import useHttp from '../../hooks/useHttp';

import TrendingVidCard from "../../components/VidCard/TrendingVidCard/TrendingVidCard";
import "./Trending.scss";



const Trending = (props) => {
  const { data, sendRequest, reqExtra } = useHttp();
  const [state, dispatch] = useStore()

  //States
  const videosData = state.trendingpage.videosData

  const APIKey = "AIzaSyBQYPwOPrbiFmiafbPOKlxQsieNuMV31yI"; // Key 2
  let CORSAnywhereURL = "https://cors-anywhere.herokuapp.com/";
  const regionCode = "NG";
  CORSAnywhereURL = "";


  useEffect(() => {
    const url = `${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&chart=mostPopular&maxResults=20&regionCode=${regionCode}&key=${APIKey}`;
    sendRequest(url);
  }, [sendRequest, CORSAnywhereURL])

  useEffect(() => {
    if (data) {
      if (!reqExtra) {
        dispatch('SET_TRENDING_PAGE_VIDEOS', data)
      }
    }
  }, [data, reqExtra, dispatch])

  useEffect(() => {
    // dispatch('RESET_TRENDING_PAGE_STATE')
  }, [dispatch])

  return (
    <div className="trending">
      {videosData ? videosData.map((vidData) => (
        <TrendingVidCard key={vidData.videoId} videosData={vidData} />
      )) : <p>Loading...</p>}
    </div>
  );
};

export default Trending;
