import React, { useState, useEffect, useReducer } from "react";

import useHttp from '../../hooks/useHttp';

import HomeVidCard from "../../components/VidCard/HomeVidCard/HomeVidCard";
import "./Home.scss";

import {
  parseDuration,
  parseTime,
  parseText,
  parseViewCount,
} from "../../shared/utilities";


const initialState = {
  videosData: null
}

const homeReducer = (curHomeState, action) => {
  switch (action.type) {
    case 'SET':
      return { ...curHomeState, videosData: action.homeVideso}

    default:
      throw new Error('Should not be reached');
  }
}

const MainPage = (props) => {
  const [homeState, dispatchHome] = useReducer(homeReducer, initialState)
  const { error, data, isLoading, sendRequest } = useHttp()

  useEffect(() => {
    sendRequest()
  }, [sendRequest])

  useEffect(() => {
    console.log(data)
    if (data) {
      console.log(data)
      const parsedData = data.map(vidData => {
        return {
          ...vidData,
          viewCount: parseViewCount(vidData.viewCount),
          title: parseText(vidData.title, 50),
          duration: parseDuration(vidData.duration),
          datePosted: parseTime(vidData.datePosted),
        }
      })

      dispatchHome({type: 'SET', homeVideso: parsedData})
    }
  }, [data, error, isLoading])

  return (
    <main className="home">
      {homeState.videosData ? homeState.videosData.map((vidData) => (
        <HomeVidCard key={vidData.videoId} videosData={vidData} />
      )) : <p>Loading...</p>}
    </main>
  );
};

export default MainPage;
