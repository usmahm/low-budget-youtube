// import { initStore } from "./store";

// import { parseDuration, parseTime, parseNumber } from "../shared/utilities";

// const configureStore = () => {
//   const actions = {
//     SET_TRENDING_PAGE_VIDEOS: (curState, APIResponse) => {
//       const videoDataArray = [];
//       const channelIDsArr = [];

//       APIResponse.items.forEach((vidData) => {
//         const parsedData = {
//           viewCount: parseNumber(vidData.statistics.viewCount),
//           channelName: vidData.snippet.channelTitle,
//           description: vidData.snippet.description,
//           title: vidData.snippet.title,
//           duration: parseDuration(vidData.contentDetails.duration),
//           datePosted: parseTime(vidData.snippet.publishedAt),
//           // embedHTML: vidData.player.embedHtml,
//           image: `https://img.youtube.com/vi/${vidData.id}/mqdefault.jpg`,
//           videoId: vidData.id,
//           channelID: vidData.snippet.channelId,
//         };
//         videoDataArray.push(parsedData);
//         channelIDsArr.push(vidData.snippet.channelId);
//       });
//       let updatedTrendingpageState = { ...curState.trendingpage };
//       updatedTrendingpageState = {
//         ...updatedTrendingpageState,
//         videosData: videoDataArray,
//         channelsIds: channelIDsArr
//       };
//       return { trendingpage: updatedTrendingpageState };
//     },
//     TOGGLE_TR_SHOULD_FETCH_VIDEOS: (curState, isTrue) => {
//       let updatedHomePageState = { ...curState.trendingpage };
//       updatedHomePageState = {
//         ...updatedHomePageState,
//         shouldFetchVidoes: isTrue,
//       };
//       return { trendingpage: updatedHomePageState };
//     },
//     TOGGLE_TR_SHOULD_FETCH_ICONS: (curState, isTrue) => {
//       let updatedHomePageState = { ...curState.trendingpage };
//       updatedHomePageState = {
//         ...updatedHomePageState,
//         shouldFetchIcons: isTrue,
//       };
//       return { trendingpage: updatedHomePageState };
//     },
//     SET_TR_CHANNEL_ICON: (curState, APIresponse) => {
//       const videoDataArray = [...curState.trendingpage.videosData];
//       console.log(videoDataArray);
//       Array.from(APIresponse.items).forEach((icon) => {
//         const iconLink = icon.snippet.thumbnails.high.url;
//         videoDataArray.forEach((videoData, index) => {
//           if (videoData.channelID === icon.id) {
//             videoDataArray[index].channelIcon = iconLink;
//           }
//         });
//       });

//       let updatedHomePageState = { ...curState.trendingpage };
//       updatedHomePageState = {
//         ...updatedHomePageState,
//         videosData: videoDataArray,
//       };
//       return { trendingpage: updatedHomePageState };
//     },
//     RESET_TRENDING_PAGE_STATE: (currState) => {
//       return {
//         trendingpage: {
//           videosData: null,
//         },
//       };
//     },
//   };

//   const initialState = {
//     videosData: null,
//     shouldFetchIcons: false,
//     shouldFetchVidoes: true,
//     channelsIds: null
//   };

//   initStore(actions, { trendingpage: initialState });
// };

// export default configureStore;
