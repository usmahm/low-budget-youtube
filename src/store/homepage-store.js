import { initStore } from "./store";

import {
  parseDuration,
  parseTime,
  parseText,
  parseNumber,
} from "../shared/utilities";

const configureStore = () => {
  const actions = {
    SET_HOMEPAGE_VIDEOS: (curState, APIResponse) => {
      const videoDataArray = [];
      // For Channel Icons
      const channelIDsArr = [];

      APIResponse.items.forEach((vidData) => {
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

      console.log(videoDataArray);
      let updatedHomePageState = { ...curState.homepage };
      updatedHomePageState = {
        ...updatedHomePageState,
        videosData: videoDataArray,
        channelsIds: channelIDsArr,
      };

      return { homepage: updatedHomePageState };
    },
    SET_CHANNEL_ICONS: (curState, APIresponse) => {
      const videoDataArray = [...curState.homepage.videosData];
      console.log(videoDataArray);
      Array.from(APIresponse.items).forEach((icon) => {
        const iconLink = icon.snippet.thumbnails.high.url;
        videoDataArray.forEach((videoData, index) => {
          if (videoData.channelID === icon.id) {
            videoDataArray[index].channelIcon = iconLink;
          }
        });
      });

      let updatedHomePageState = { ...curState.homepage };
      updatedHomePageState = {
        ...updatedHomePageState,
        videosData: videoDataArray,
      };
      return { homepage: updatedHomePageState };
    },
    TOGGLE_SHOULD_FETCH_ICONS: (curState, isTrue) => {
      let updatedHomePageState = { ...curState.homepage };
      updatedHomePageState = {
        ...updatedHomePageState,
        shouldFetchIcons: isTrue,
      };
      return { homepage: updatedHomePageState };
    },
    TOGGLE_SHOULD_FETCH_VIDEOS: (curState, isTrue) => {
      let updatedHomePageState = { ...curState.homepage };
      updatedHomePageState = {
        ...updatedHomePageState,
        shouldFetchVidoes: isTrue,
      };
      return { homepage: updatedHomePageState };
    },
    RESET_HOME_STATE: (curState) => {
      return { homepage: {
        videosData: null,
        channelsIds: null,
        shouldFetchIcons: false,
        shouldFetchVidoes: true,
      }}
    }
  };

  const initialState = {
    videosData: null,
    channelsIds: null,
    shouldFetchIcons: false,
    shouldFetchVidoes: true,
  };

  initStore(actions, { homepage: initialState });
};

export default configureStore;
