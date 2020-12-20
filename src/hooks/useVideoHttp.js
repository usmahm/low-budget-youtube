import { useCallback, useReducer } from "react";
import axios from "axios";
import APIKeys from '../shared/APIKeys';

import {
  parseDuration,
  parseTime,
  parseText,
  parseNumber,
} from "../shared/utilities";

const initialState = {
  videosData: [],
  nextPageToken: null,
  totalResults: null,
  loading: false,
  error: null,
  extra: null,
};

const videosReducer = (curVideosState, action) => {
  switch (action.type) {
    case "RESPONSE":
      console.log(action)
      return {
        ...curVideosState,
        videosData: action.videosDataArr,
        nextPageToken: action.nextPageToken,
        totalResults: action.totalResults
      };
    case "SET_MORE_VIDEOS":
      return {
        ...curVideosState,
        videosData: [
          ...curVideosState.videosData,
          ...action.videosDataArr
        ],
        nextPageToken: action.nextPageToken
      }
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
      return {
        ...curVideosState,
        videosData: vidDataArray,
      };
    // case "RESET_HOME_STATE":
    //   return {
    //     videosData: [],
    //     loading: false,
    //     error: null,
    //     extra: null,
    //   };
    default:
      throw new Error("Should not be reached");
  }
};

const parseResponse = (response) => {
  const videoDataArray = [];
  const channelIDsArr = [];

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

  return [videoDataArray, channelIDsArr]
}

const useVideoHttp = () => {
  const [videosState, dispatchVideos] = useReducer(videosReducer, initialState);

  // Only used to make first First API call which will return next Page Token used in subsequent calls
  const sendVideosRequest = useCallback(
    (url, reqExtra) => {
      axios
        .get(url)
        .then((response) => {
          const [videoDataArray, channelIDsArr] = parseResponse(response)

          dispatchVideos({
            type: "RESPONSE",
            videosDataArr: videoDataArray,
            nextPageToken: response.data.nextPageToken,
            totalResults: response.data.pageInfo.totalResults,
            extra: reqExtra,
          });
          return axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIDsArr.join(",")}&fields=items(id%2Csnippet%2Fthumbnails)&key=${APIKeys.key18}`);
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
    []
  );

  const fetchMoreVideos = useCallback(
    (url, reqExtra) => {
      axios
        .get(url)
        .then((response) => {
          const [videoDataArray, channelIDsArr] = parseResponse(response);
          dispatchVideos({
            type: "SET_MORE_VIDEOS",
            videosDataArr: videoDataArray,
            nextPageToken: response.data.nextPageToken,
            extra: reqExtra,
          });
          return axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIDsArr.join(",")}&fields=items(id%2Csnippet%2Fthumbnails)&key=${APIKeys.key19}`);
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
    []
  )

  return {
      isLoading: videosState.loading,
      data: videosState.videosData,
      error: videosState.error,
      sendVideosRequest: sendVideosRequest,
      reqExtra: videosState.extra,
      fetchMoreVideos: fetchMoreVideos,
      nextPageToken: videosState.nextPageToken,
      totalResults: videosState.totalResults
  }
};

export default useVideoHttp;
