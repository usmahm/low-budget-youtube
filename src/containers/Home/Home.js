import React, { useEffect, useReducer } from "react";

import useHttp from "../../hooks/useHttp";

import HomeVidCard from "../../components/VidCard/HomeVidCard/HomeVidCard";
import "./Home.scss";

import {
  parseDuration,
  parseTime,
  parseText,
  parseNumber,
} from "../../shared/utilities";

const initialState = {
  videosData: null,
};

const homeReducer = (curHomeState, action) => {
  switch (action.type) {
    case "SET":
      return { ...curHomeState, videosData: action.homeVideos };
    case "SET_CHANNEL_ICONS":
      const videoDataArray = curHomeState.videosData;
      Array.from(action.channelIcons).forEach((icon) => {
        const iconLink = icon.snippet.thumbnails.high.url;
        videoDataArray.forEach((videoData, index) => {
          if (videoData.channelID === icon.id) {
            videoDataArray[index].channelIcon = iconLink;
          }
        });
      });
      return {
        ...curHomeState,
        videosData: videoDataArray,
      };
    default:
      throw new Error("Should not be reached");
  }
};

const MainPage = (props) => {
  const [homeState, dispatchHome] = useReducer(homeReducer, initialState);
  const { error, data, isLoading, sendRequest, reqExtra } = useHttp();

  const APIKey = "AIzaSyC0-Cu83uFnN2GDL04ISyf8NO674ElR2P8";
  let CORSAnywhereURL = "https://cors-anywhere.herokuapp.com/";
  const regionCode = "CD";
  CORSAnywhereURL = "";

  useEffect(() => {
    const url = `${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&chart=mostPopular&maxResults=20&regionCode=${regionCode}&key=${APIKey}`;
    sendRequest(url);
  }, [sendRequest, CORSAnywhereURL]);

  useEffect(() => {
    console.log(data);
    const videoDataArray = [];
    // For Channel Icons
    const channelIDsArr = [];

    if (data) {
      if (!reqExtra) {
        data.items.forEach((vidData) => {
          const parsedData = {
            viewCount: parseNumber(vidData.statistics.viewCount),
            channelName: vidData.snippet.channelTitle,
            title: parseText(vidData.snippet.title, 50),
            duration: parseDuration(vidData.contentDetails.duration),
            datePosted: parseTime(vidData.snippet.publishedAt),
            embedHTML: vidData.player.embedHtml,
            image: `https://img.youtube.com/vi/${vidData.id}/mqdefault.jpg`,
            videoId: vidData.id,
            channelID: vidData.snippet.channelId,
          };
          videoDataArray.push(parsedData);
          channelIDsArr.push(vidData.snippet.channelId);
        });
        
        dispatchHome({ type: "SET", homeVideos: videoDataArray });
        sendRequest(
          `${CORSAnywhereURL}https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIDsArr.join(",")}&fields=items(id%2Csnippet%2Fthumbnails)&key=${APIKey}`,
          {
            identifier: "GET_CHANNEL_ICONS",
          }
        );
      } else if (reqExtra.identifier === "GET_CHANNEL_ICONS") {
        dispatchHome({ type: "SET_CHANNEL_ICONS", channelIcons: data.items });
      }
    }
  }, [data, sendRequest, reqExtra, CORSAnywhereURL]);

  return (
    <main className="home">
      {homeState.videosData ? (
        homeState.videosData.map((vidData) => (
          <HomeVidCard key={vidData.videoId} videosData={vidData} />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default MainPage;
