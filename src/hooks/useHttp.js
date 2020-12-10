import { useCallback, useReducer } from 'react';
import axios from 'axios';

const APIKey = "AIzaSyC0-Cu83uFnN2GDL04ISyf8NO674ElR2P8";
const CORSAnywhereURL = 'https://cors-anywhere.herokuapp.com/';

const initialState = {
    loading: false,
    error: null,
    data: null,
}

const httpReducer = (curHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { ...curHttpState, loading: true, data: null}
        case 'RESPONSE':
            return { ...curHttpState, loading: false, data: action.responseData }
        case 'ERROR':
            return { ...curHttpState, loading: false, error: action.error}
        case 'CLEAR':
            return initialState
        default:
            throw new Error('Should not be reached!')
    }
}

const useHttp = () => {

    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);
    
      // Gets Videos Data from API
        // Remember - the country code has to be dynamic
        const regionCode = "NG";
        
        // First API call returns all data but channel Icons
        const sendRequest = useCallback(() => {
            const videoDataArray = [];
            dispatchHttp({type: 'SEND'})

            axios.get(`${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&chart=mostPopular&maxResults=20&regionCode=${regionCode}&key=${APIKey}`)
              .then((response) => {
                const resVidsData = response.data.items;
        
                // For Channel Icons
                const channelIDsArr = [];
        
                resVidsData.forEach((vidData) => {
                  const parsedData = {
                    viewCount: vidData.statistics.viewCount,
                    channelName: vidData.snippet.channelTitle,
                    description: vidData.snippet.description,
                    title: vidData.snippet.title,
                    duration: vidData.contentDetails.duration,
                    datePosted: vidData.snippet.publishedAt,
                    embedHTML: vidData.player.embedHtml,
                    image: `https://img.youtube.com/vi/${vidData.id}/mqdefault.jpg`,
                    videoId: vidData.id,
                    channelID: vidData.snippet.channelId,
                  };
                  videoDataArray.push(parsedData);
                  channelIDsArr.push(vidData.snippet.channelId);
                });
                return channelIDsArr;
              })
              .then((channelIDsArr) => {
                axios.get(`${CORSAnywhereURL}https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIDsArr.join(',')}&fields=items(id%2Csnippet%2Fthumbnails)&key=${APIKey}`)
                  .then(response => {
                    const resData = response.data;
                    const channelIconArray = resData.items;
        
                    channelIconArray.forEach(icon => {
                      const iconLink = icon.snippet.thumbnails.high.url;
                      videoDataArray.forEach((videoData, index) => {
                        if (videoData.channelID === icon.id) {
                          videoDataArray[index].channelIcon = iconLink
                        }
                      })
                    })
        
                    console.log(videoDataArray);
                    dispatchHttp({type: 'RESPONSE', responseData: videoDataArray})
                  });
              })
              .catch((error) => {
                  dispatchHttp({type: 'ERROR', error: error})
                console.log(error);
              });

        }, [])

      return {
          isLoading: httpState.isLoading,
          data: httpState.data,
          error: httpState.error,
          sendRequest: sendRequest
      }
}

export default useHttp