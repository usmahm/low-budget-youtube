import React, { useEffect } from "react";

import {useStore} from '../../store/store'
import useHttp from "../../hooks/useHttp";

import HomeVidCard from "../../components/VidCard/HomeVidCard/HomeVidCard";
import "./Home.scss";

const MainPage = (props) => {
  const { data, sendRequest, reqExtra } = useHttp();
  const [state, dispatch] = useStore()

  // States
  const videosData = state.homepage.videosData;
  const channelIdsArr = state.homepage.channelsIds;
  const shouldFetchIcons = state.homepage.shouldFetchIcons;
  const shouldFetchVidoes = state.homepage.shouldFetchVidoes

  let APIKey = 'AIzaSyC0-Cu83uFnN2GDL04ISyf8NO674ElR2P8' // Key 1
  // let CORSAnywhereURL = "https://cors-anywhere.herokuapp.com/";
  const regionCode = "NG";
  // CORSAnywhereURL = "";

  // Handles request to the server
  useEffect(() => {
    if (shouldFetchVidoes) {
      sendRequest(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&chart=mostPopular&maxResults=40&regionCode=${regionCode}&key=${APIKey}`);
      dispatch('TOGGLE_SHOULD_FETCH_VIDEOS', false)
    } else if (videosData && shouldFetchIcons) {
      sendRequest(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIdsArr.join(",")}&fields=items(id%2Csnippet%2Fthumbnails)&key=${APIKey}`,
        {
          identifier: "GET_CHANNEL_ICONS",
        }
      );
    }
  }, [videosData, APIKey, sendRequest, channelIdsArr, shouldFetchIcons, shouldFetchVidoes, dispatch]);

  // Sets fetched data to the global state 
  useEffect(() => {
    if (data) {
      if (!reqExtra) {
        dispatch('SET_HOMEPAGE_VIDEOS', data)
        dispatch('TOGGLE_SHOULD_FETCH_ICONS', true)
      } else if (reqExtra.identifier === "GET_CHANNEL_ICONS") {
        console.log(data)
        dispatch('SET_CHANNEL_ICONS', data)
        dispatch('TOGGLE_SHOULD_FETCH_ICONS', false)
      }
    }
  }, [data, reqExtra, dispatch]);

  useEffect(() => {
    return () => {
      // dispatch('RESET_HOME_STATE')
    }
  }, [dispatch])

  return (
    <main className="home">
      {videosData ? (
        videosData.map((vidData) => (
          <HomeVidCard key={vidData.videoId} videosData={vidData} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default MainPage;
