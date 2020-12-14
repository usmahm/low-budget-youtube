import { initStore } from "./store";

import {
  parseDuration,
  parseTime,
  parseText,
  parseNumber,
} from "../shared/utilities";

const configureStore = () => {
  const actions = {
    SET_TRENDING_PAGE_VIDEOS: (curState, APIResponse) => {
      const videoDataArray = [];

      APIResponse.items.forEach((vidData) => {
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
      let updatedTrendingpageState = { ...curState.trendingpage };
      updatedTrendingpageState = {
        ...updatedTrendingpageState,
        videosData: videoDataArray,
      };
      return { trendingpage: updatedTrendingpageState };
    },
    RESET_TRENDING_PAGE_STATE: (currState) => {
      return {
        trendingpage: {
          videosData: null,
        },
      };
    },
  };

  const initialState = {
    videosData: null,
  };

  initStore(actions, { trendingpage: initialState });
};

export default configureStore;
