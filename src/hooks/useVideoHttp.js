import { useCallback, useReducer } from "react";
import axios from "axios";

import {
  parseDuration,
  parseTime,
  parseText,
  parseNumber,
} from "../shared/utilities";

const initialState = {
  videosData: null,
  loading: false,
  error: null,
  extra: null,
};

const videosReducer = (curVideosState, action) => {
  switch (action.type) {
    case "RESPONSE":
      return {
        ...curVideosState,
        videosData: action.videosDataArr,
      };
    case "SET_CHANNEL_ICONS":
      const vidDataArray = [...curVideosState.videosData];
      console.log(action)
      Array.from(action.response.items).forEach((icon) => {
        const iconLink = icon.snippet.thumbnails.high.url;
        vidDataArray.forEach((videoData, index) => {
          if (videoData.channelID === icon.id) {
            vidDataArray[index].channelIcon = iconLink;
          }
        });
      });

      console.log({
        ...curVideosState,
        videosData: vidDataArray,
      })

      return {
        ...curVideosState,
        videosData: vidDataArray,
      };
    case "RESET_HOME_STATE":
      return {
        videosData: null,
        loading: false,
        error: null,
        extra: null,
      };
    default:
      throw new Error("Should not be reached");
  }
};

const useVideoHttp = () => {
  let APIKey = "AIzaSyC0-Cu83uFnN2GDL04ISyf8NO674ElR2P8"; // Key 1
  // let CORSAnywhereURL = "https://cors-anywhere.herokuapp.com/";
//   const regionCode = "NG";

  const [videosState, dispatchVideos] = useReducer(videosReducer, initialState);

  const sendVideosRequest = useCallback(
    (url, reqExtra) => {
      axios
        .get(url)
        .then((response) => {
          const videoDataArray = [];
          const channelIDsArr = [];

          console.log(response)
          response.data.items.forEach((vidData) => {
            const parsedData = {
              viewCount: parseNumber(vidData.statistics.viewCount),
              channelName: vidData.snippet.channelTitle,
              title: parseText(vidData.snippet.title, 50),
              description: vidData.snippet.description,
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
          dispatchVideos({
            type: "RESPONSE",
            videosDataArr: videoDataArray,
            extra: reqExtra,
          });
          return axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIDsArr.join(",")}&fields=items(id%2Csnippet%2Fthumbnails)&key=${APIKey}`);
        })
        .then(response => {
            dispatchVideos({
                type: "SET_CHANNEL_ICONS",
                response: response.data
            })
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [APIKey]
  );

  return {
      isLoading: videosState.loading,
      data: videosState.videosData,
      error: videosState.error,
      sendVideosRequest: sendVideosRequest,
      reqExtra: videosState.extra
  }
};

export default useVideoHttp;
