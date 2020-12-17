import { useCallback, useReducer } from "react";
import axios from "axios";

import {
  parseDuration,
  parseTime,
  parseNumber,
} from "../shared/utilities";

const initialState = {
  videosData: null,
  loading: false,
  error: null,
};

const useSearchReducer = (curSearchState, action) => {
  switch (action.type) {
    case "SET_SEARCH_RESULTS":
      return {
        ...curSearchState,
        videosData: action.results,
      };
    case "SET_SEARCH_RESULTS_DATA1":
      console.log(curSearchState);
      const videoDataArray = [...curSearchState.videosData];
      Array.from(action.results.items).forEach((vidData) => {
        videoDataArray.forEach((videoData, index) => {
          if (videoData.videoId === vidData.id) {
            videoDataArray[index].viewCount = parseNumber(
              vidData.statistics.viewCount
            );
            videoDataArray[index].duration = parseDuration(
              vidData.contentDetails.duration
            );
          }
        });
      });
      console.log(videoDataArray);
      return {
        ...curSearchState,
        videosData: videoDataArray,
      };
    case "SET_SEARCH_RESULTS_CHANNEL_ICON":
      const vidDataArray = [...curSearchState.videosData];
      console.log(action.results);
      Array.from(action.results.items).forEach((icon) => {
        const iconLink = icon.snippet.thumbnails.high.url;
        vidDataArray.forEach((videoData, index) => {
          if (videoData.channelID === icon.id) {
            vidDataArray[index].channelIcon = iconLink;
          }
        });
      });
      console.log(vidDataArray);
      return {
        ...curSearchState,
        videosData: vidDataArray,
      };
    case "RESET_STATE": 
      return {
        videosData: null,
        loading: false,
        error: null,
        }
    default:
      throw new Error("Should not be reached!");
  }
};

const useSearchHttp = () => {
  let APIKey = "AIzaSyC0-Cu83uFnN2GDL04ISyf8NO674ElR2P8"; // Key 1

  const [searchState, dispatchSearch] = useReducer(
    useSearchReducer,
    initialState
  );

  const sendSearchRequest = useCallback(
    (url, reqExtra) => {
      const channelsIdArr = [];
      axios
        .get(url)
        .then((response) => {
          const videoDataArray = [];
          const videosId = [];
          console.log(response);

          response.data.items.forEach((vidData, index) => {
            if (vidData.snippet) {
              const parsedData = {
                channelName: vidData.snippet.channelTitle,
                title: vidData.snippet.title,
                datePosted: parseTime(vidData.snippet.publishedAt),
                image: `https://img.youtube.com/vi/${vidData.id.videoId}/mqdefault.jpg`,
                videoId: vidData.id.videoId,
                channelID: vidData.snippet.channelId,
                description: vidData.snippet.description
              };
              videoDataArray.push(parsedData);
              videosId.push(vidData.id.videoId);
              channelsIdArr.push(vidData.snippet.channelId);
            }
          });
          console.log(videoDataArray);
          dispatchSearch({
            type: "SET_SEARCH_RESULTS",
            results: videoDataArray,
          });
          return axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics%2CcontentDetails&id=${videosId.join(",")}&key=${APIKey}`);
        })
        .then((response) => {
            console.log(response.data)
          dispatchSearch({
            type: "SET_SEARCH_RESULTS_DATA1",
            results: response.data,
          });

          return axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelsIdArr.join(",")}&fields=items(id%2Csnippet%2Fthumbnails)&key=${APIKey}`);
        })
        .then((response) => {
          dispatchSearch({
            type: "SET_SEARCH_RESULTS_CHANNEL_ICON",
            results: response.data,
          });
        });
    },
    [APIKey]
  );

  const resetState = useCallback(() => {
    dispatchSearch({type: 'RESET_STATE'})
  }, [])

  return {
    isLoading: searchState.loading,
    searchData: searchState.videosData,
    error: searchState.error,
    sendSearchRequest: sendSearchRequest,
    resetSearchState: resetState
  };
};

export default useSearchHttp;
