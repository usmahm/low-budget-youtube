import { initStore } from "./store";
import moment from "moment";

import {
  parseNumber
} from "../shared/utilities";

const configureStore = () => {
  const actions = {
    SET_WVID_PAGE_VIDEO_DETAILS: (curState, APIResponse) => {
      const response = APIResponse.items[0];
      console.log(response);
      const videoData = {
        title: response.snippet.title,
        datePosted: moment(response.snippet.publishedAt).format("ll"),
        videoId: response.id,
        channelID: response.snippet.channelId,
        channelName: response.snippet.channelTitle,
        viewCount: parseNumber(
          response.statistics.viewCount,
          "SEPERATE_BY_COMMA"
        ),
        dislikeCount: response.statistics.dislikeCount ? parseNumber(response.statistics.dislikeCount) : 0,
        likeCount: response.statistics.likeCount ? parseNumber(response.statistics.likeCount) : 0,
        description: response.snippet.description,
        subscriberCount: "",
      };

      let updatedWatchVidPageState = { ...curState.watchVidPage };
      updatedWatchVidPageState = {
        ...updatedWatchVidPageState,
        videoDetails: videoData,
      };
      return { watchVidPage: updatedWatchVidPageState };
    },
    SET_WVID_CHANNEL_DETAILS: (curState, APIResponse) => {
      console.log(APIResponse)
      let updatedWatchVidPageState = { ...curState.watchVidPage };
      updatedWatchVidPageState = {
        ...updatedWatchVidPageState,
        videoDetails: {
          ...updatedWatchVidPageState.videoDetails,
          subscriberCount: parseNumber(APIResponse.items[0].statistics.subscriberCount),
          channelIcon: APIResponse.items[0].snippet.thumbnails.default.url,
        },
      };
      return { watchVidPage: updatedWatchVidPageState };
    },
    SET_WVID_DATA_IS_FETCHED: (curState, slice) => {
      let updatedWatchVidPageState = { ...curState.watchVidPage };
      updatedWatchVidPageState = {
        ...updatedWatchVidPageState,
        ...slice
      };
      return { watchVidPage: updatedWatchVidPageState };
    },
    RESET_WDIV_STATE: (curState) => {
      console.log('RESET')
      return {
        watchVidPage: {
          relatedVideos: null,
          videoDetails: null,
          isVidDetailsFetched: false,
          isOtherVidDetailsFetched: false,
        }
      }
    }
  };

  const initialState = {
    relatedVideos: null,
    videoDetails: null,
    isVidDetailsFetched: false,
    isOtherVidDetailsFetched: false,
  };

  initStore(actions, { watchVidPage: initialState });
};

export default configureStore;
