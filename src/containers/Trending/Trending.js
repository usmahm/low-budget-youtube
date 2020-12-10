import React, { useEffect, useReducer} from "react";
import useHttp from '../../hooks/useHttp';

import TrendingVidCard from "../../components/VidCard/TrendingVidCard/TrendingVidCard";
import "./Trending.scss";

import {
  parseDuration,
  parseTime,
  parseText,
  parseViewCount,
} from "../../shared/utilities";

const initialState = {
  trendingVideos: null
}

const trendingReducer = (curTrenddingState, action) => {
  switch (action.type) {
    case 'SET':
      return { ...curTrenddingState, trendingVideos: action.trendingVideos}
    default:
      throw new Error('Should not be reached!')
  }
}

const Trending = (props) => {
  const [trendingState, dispatchTrending] = useReducer(trendingReducer, initialState)
  
  const { error, data, isLoading, sendRequest } = useHttp()

  useEffect(() => {
    sendRequest()
  }, [sendRequest])

  useEffect(() => {
    if (data) {
      console.log(data)
      const parsedData = data.map(vidData => {
        return {
          ...vidData,
          viewCount: parseViewCount(vidData.viewCount),
          description: parseText(vidData.description, 160), //50
          title: parseText(vidData.title, 100),
          duration: parseDuration(vidData.duration),
          datePosted: parseTime(vidData.datePosted),
        }
      })
    {/* <Trending videosData={parseVidsData(videosData, 188, 100)} /> */}


      dispatchTrending({type: 'SET', trendingVideos: parsedData})
    }
  }, [data, error, isLoading])

    // console.log(props.videosData)
  return (
    <div className="trending">
      {trendingState.trendingVideos ? trendingState.trendingVideos.map((vidData) => (
        <TrendingVidCard key={vidData.videoId} videosData={vidData} />
      )) : <p>Loading...</p>}
    </div>
  );
};

export default Trending;
