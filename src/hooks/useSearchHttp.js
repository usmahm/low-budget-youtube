import { useCallback, useReducer } from "react";
import axios from "axios";

import {
  parseDuration,
  parseTime,
  parseNumber,
} from "../shared/utilities";

const initialState = {
  videosData: [],
  totalResults: null,
  nextPageToken: null,
  loading: false,
  error: null,
};

const useSearchReducer = (curSearchState, action) => {
  switch (action.type) {
    case "SET_SEARCH_RESULTS":
      return {
        ...curSearchState,
        videosData: action.results,
        nextPageToken: action.nextPageToken,
        totalResults: action.totalResults
      };
      case "SET_MORE_SEARCH_RESULTS":
        // Results need to be filtered becauase the search results returned by the API contains some previous values
        const filteredResults = action.results.filter(result => {
          return !curSearchState.videosData.some(e => e.videoId === result.videoId)
        }) 
      
        return {
          ...curSearchState,
          videosData: [
            ...curSearchState.videosData,
            ...filteredResults
          ],
          nextPageToken: action.nextPageToken,
        };
    case "SET_SEARCH_RESULTS_DATA1":
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
      return {
        ...curSearchState,
        videosData: videoDataArray,
      };
    case "SET_SEARCH_RESULTS_CHANNEL_ICON":
      const vidDataArray = [...curSearchState.videosData];
      if (!action.results.items) {
        return curSearchState
      }
      Array.from(action.results.items).forEach((icon) => {
        const iconLink = icon.snippet.thumbnails.high.url;
        vidDataArray.forEach((videoData, index) => {
          if (videoData.channelID === icon.id) {
            vidDataArray[index].channelIcon = iconLink;
          }
        });
      });
      return {
        ...curSearchState,
        videosData: vidDataArray,
      };
    case "RESET_STATE": 
      return {
        videosData: [],
        loading: false,
        error: null,
        };
    case "SET_SEARCH_ERROR":
        return {
          ...curSearchState,
          error: action.error
        }
    default:
      throw new Error("Should not be reached!");
  }
};

const parseResponse = (response) => {
  const channelsIdArray = [];
  const videoDataArray = [];
  const videosId = [];

  response.data.items.forEach((vidData, index) => {
    if (vidData.snippet && vidData.id.videoId) {
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
      channelsIdArray.push(vidData.snippet.channelId);
    }
  });

  return [channelsIdArray, videoDataArray, videosId]
}

const useSearchHttp = () => {
  const [searchState, dispatchSearch] = useReducer(
    useSearchReducer,
    initialState
  );

  const sendSearchRequest = useCallback(
    (url, reqExtra) => {
      let channelsIdArr = [];
      axios
        .get(url)
        .then((response) => {
          const [channelsIdArray, videoDataArray, videosId] = parseResponse(response)
          channelsIdArr = [...channelsIdArray]
          dispatchSearch({
            type: "SET_SEARCH_RESULTS",
            results: videoDataArray,
            nextPageToken: response.data.nextPageToken,
            totalResults: response.data.pageInfo.totalResults   
          });
          return axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics%2CcontentDetails&id=${videosId.join(",")}&key=${process.env.REACT_APP_KEY_11}`);
        })
        .then((response) => {
          dispatchSearch({
            type: "SET_SEARCH_RESULTS_DATA1",
            results: response.data,
          });
          return axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelsIdArr.join(",")}&fields=items(id%2Csnippet%2Fthumbnails)&key=${process.env.REACT_APP_KEY_12}`);
        })
        .then((response) => {
          dispatchSearch({
            type: "SET_SEARCH_RESULTS_CHANNEL_ICON",
            results: response.data,
          });
        })
        .catch(error => {
          if (error.response) {
            dispatchSearch({
              type: "SET_SEARCH_ERROR",
              error: error.response
            })
          }
        });
    },
    []
  );

  const fetchMoreSearchResult = useCallback(
    (url, reqExtra) => {
      let channelsIdArr = [];
      axios
        .get(url)
        .then((response) => {
          const [channelsIdArray, videoDataArray, videosId] = parseResponse(response)
          channelsIdArr = [...channelsIdArray]
          dispatchSearch({
            type: "SET_MORE_SEARCH_RESULTS",
            results: videoDataArray,
            nextPageToken: response.data.nextPageToken
          });
          return axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics%2CcontentDetails&id=${videosId.join(",")}&key=${process.env.REACT_APP_KEY_13}`);
        })
        .then((response) => {
          dispatchSearch({
            type: "SET_SEARCH_RESULTS_DATA1",
            results: response.data,
          });
          return axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelsIdArr.join(",")}&fields=items(id%2Csnippet%2Fthumbnails)&key=${process.env.REACT_APP_KEY_14}`);
        })
        .then((response) => {
          dispatchSearch({
            type: "SET_SEARCH_RESULTS_CHANNEL_ICON",
            results: response.data,
          });
        });
    },
    []
  );

  const resetState = useCallback(() => {
    dispatchSearch({type: 'RESET_STATE'})
  }, [])

  return {
    isLoading: searchState.loading,
    searchData: searchState.videosData,
    error: searchState.error,
    sendSearchRequest: sendSearchRequest,
    resetSearchState: resetState,
    fetchMoreSearchResult: fetchMoreSearchResult,
    nextPageToken: searchState.nextPageToken,
    totalResults: searchState.totalResults
  };
};

export default useSearchHttp;
