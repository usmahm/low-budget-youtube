import { initStore } from "./store";

import { parseNumber } from "../shared/utilities";

const configureStore = () => {
  const actions = {
      SET_ABOUT_CHANNEL: (curState, APIResponse) => {
          const response = APIResponse.items[0]
          console.log(response)
          const channelData = {
              channelID: response.id,
              channelName: response.snippet.title,
              channelIcon: response.snippet.thumbnails.medium.url,
              subsriberCount: parseNumber(response.statistics.subscriberCount),
              viewsCount: response.statistics.viewCount,
              videoCount: response.statistics.videoCount,
              banerImage: response.brandingSettings.image.bannerExternalUrl,
              description: response.brandingSettings.channel.description,
          }

          let updatedChannelPageState = { ...curState.channelPage }
          updatedChannelPageState = {
              ...updatedChannelPageState,
              channelDetails: channelData 
          }

          return { channelPage: updatedChannelPageState }
      },
      SET_CHANNEL_VIDEOS: (curState, APIResponse) => {
        let updatedChannelPageState = { ...curState.channelPage }
        updatedChannelPageState = {
            ...updatedChannelPageState,
            channelVideos: APIResponse 
        }

        return { channelPage: updatedChannelPageState }
      }
  };

  const initialState = {
      channelDetails: null,
      channelVideos: null
  };

  initStore(actions, { channelPage: initialState });
};

export default configureStore