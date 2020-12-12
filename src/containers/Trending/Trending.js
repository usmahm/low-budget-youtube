import React, { useEffect, useReducer} from "react";
import useHttp from '../../hooks/useHttp';

import TrendingVidCard from "../../components/VidCard/TrendingVidCard/TrendingVidCard";
import "./Trending.scss";

import {
  parseDuration,
  parseTime,
  parseText,
  parseNumber,
} from "../../shared/utilities";

const initialState = {
  videosData: null
}

const trendingReducer = (curTrenddingState, action) => {
  switch (action.type) {
    case 'SET':
      return { ...curTrenddingState, videosData: action.trendingVideos}
    default:
      throw new Error('Should not be reached!')
  }
}

const Trending = (props) => {
  const [trendingState, dispatchTrending] = useReducer(trendingReducer, initialState)
  const { error, data, isLoading, sendRequest, reqExtra } = useHttp();

  const APIKey = "AIzaSyC0-Cu83uFnN2GDL04ISyf8NO674ElR2P8";
  let CORSAnywhereURL = "https://cors-anywhere.herokuapp.com/";
  const regionCode = "CD";
  CORSAnywhereURL = "";


  useEffect(() => {
    const url = `${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&chart=mostPopular&maxResults=20&regionCode=${regionCode}&key=${APIKey}`;
    sendRequest(url);
  }, [sendRequest, CORSAnywhereURL])

  useEffect(() => {
    console.log(data);
    const videoDataArray = [];

    if (data) {
      if (!reqExtra) {
        data.items.forEach((vidData) => {
          const parsedData = {
            viewCount: parseNumber(vidData.statistics.viewCount),
            channelName: vidData.snippet.channelTitle,
            description: parseText(vidData.snippet.description, 160),
            title: parseText(vidData.snippet.title, 100),
            duration: parseDuration(vidData.contentDetails.duration),
            datePosted: parseTime(vidData.snippet.publishedAt),
            embedHTML: vidData.player.embedHtml,
            image: `https://img.youtube.com/vi/${vidData.id}/mqdefault.jpg`,
            videoId: vidData.id,
            channelID: vidData.snippet.channelId,
          };
          videoDataArray.push(parsedData);
        });
        dispatchTrending({ type: "SET", trendingVideos: videoDataArray });
      }
    }
  }, [data, error, reqExtra, isLoading])

  return (
    <div className="trending">
      {trendingState.videosData ? trendingState.videosData.map((vidData) => (
        <TrendingVidCard key={vidData.videoId} videosData={vidData} />
      )) : <p>Loading...</p>}
    </div>
  );
};

export default Trending;
