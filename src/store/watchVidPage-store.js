import { initStore } from "./store";
import moment from "moment";

import {
  parseDuration,
  parseTime,
  parseText,
  parseNumber,
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
    SET_SUBSCRIBER_COUNT: (curState, APIResponse) => {
      let updatedWatchVidPageState = { ...curState.watchVidPage };
      updatedWatchVidPageState = {
        ...updatedWatchVidPageState,
        videoDetails: {
          ...updatedWatchVidPageState.videoDetails,
          subscriberCount: parseNumber(
            APIResponse.items[0].statistics.subscriberCount
          ),
        },
      };
      return { watchVidPage: updatedWatchVidPageState };
    },
    SET_WVID_CHANNEL_ICON: (curState, APIResponse) => {
        console.log(APIResponse)
      let updatedWatchVidPageState = { ...curState.watchVidPage };
      updatedWatchVidPageState = {
        ...updatedWatchVidPageState,
        videoDetails: {
          ...updatedWatchVidPageState.videoDetails,
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
    SET_WVID_RELATED_VIDS: (curState, APIResponse) => {
      const videoDataArray = [];
      const relatedVideosId = [];

      APIResponse.items.forEach((vidData, index) => {
        if (vidData.snippet) {
          const parsedData = {
            channelName: vidData.snippet.channelTitle,
            title: parseText(vidData.snippet.title, 50),
            datePosted: parseTime(vidData.snippet.publishedAt),
            image: `https://img.youtube.com/vi/${vidData.id.videoId}/hqdefault.jpg`,
            videoId: vidData.id.videoId,
          };
          videoDataArray.push(parsedData);
          relatedVideosId.push(vidData.id.videoId);
        }
      });
      let updatedWatchVidPageState = { ...curState.watchVidPage };
      updatedWatchVidPageState = {
        ...updatedWatchVidPageState,
        relatedVideos: videoDataArray,
        relatedVidsId: relatedVideosId,
      };
      return { watchVidPage: updatedWatchVidPageState };
    },
    SET_WVID_RELATED_VIDS_VIEW_COUNT: (curState, APIResponse) => {
        const videoDataArray = [ ...curState.watchVidPage.relatedVideos ];
        Array.from(APIResponse.items).forEach((vidData) => {
          // const viewCount = vidData.statistics.viewCount;
          videoDataArray.forEach((videoData, index) => {
            if (videoData.videoId === vidData.id) {
              videoDataArray[index].viewCount = parseNumber(vidData.statistics.viewCount);
              videoDataArray[index].duration = parseDuration(vidData.contentDetails.duration);
            }
          });
        });
        let updatedWatchVidPageState = { ...curState.watchVidPage };
        updatedWatchVidPageState = {
          ...updatedWatchVidPageState,
          relatedVideos: videoDataArray,
        };
        return { watchVidPage: updatedWatchVidPageState };
    },
    RESET_WDIV_STATE: (curState) => {
      return {
        watchVidPage: {
          relatedVideos: null,
          videoDetails: null,
          isVidDetailsFetched: false,
          isOtherVidDetailsFetched: false,
          relatedVidsId: null,
        }
      }
    }
  };

  const initialState = {
    relatedVideos: null,
    videoDetails: null,
    isVidDetailsFetched: false,
    isOtherVidDetailsFetched: false,
    relatedVidsId: null,
  };

  initStore(actions, { watchVidPage: initialState });
};

export default configureStore;
