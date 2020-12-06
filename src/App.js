import React, { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "./containers/Sidebar/Sidebar";
import Header from "./containers/Header/Header";
import Home from "./containers/Home/Home";
import Trending from "./containers/Trending/Trending";

import {
  parseDuration,
  parseTime,
  parseText,
  parseViewCount,
} from "./shared/utilities";

// import data from "./data";
import "./App.scss";
const APIKey = "AIzaSyC0-Cu83uFnN2GDL04ISyf8NO674ElR2P8";


function App() {
  const [videosData, setVideosData] = useState([]);

  // Gets Videos Data from API
  useEffect(() => {
    console.log('[App.js] useEffect')

    // Remember - the country code has to be dynamic
    const regionCode = "NG";
    const channelIDsObj = {};
    console.log(channelIDsObj)

    // First API call returns all data but channel Icons
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&chart=mostPopular&maxResults=5&regionCode=${regionCode}&key=${APIKey}`
      )
      .then((response) => {
        const resVidsData = response.data.items;
        // console.log(resVidsData);
        const arr = [];

        // For Channel Icons
        const channelIDsArr = [];

        resVidsData.forEach((vidData) => {
          const parsedData = {
            viewCount: parseViewCount(vidData.statistics.viewCount),
            channelName: vidData.snippet.channelTitle,
            description: parseText(vidData.snippet.description, 50),
            title: parseText(vidData.snippet.title, 50),
            duration: parseDuration(vidData.contentDetails.duration),
            datePosted: parseTime(vidData.snippet.publishedAt),
            embedHTML: vidData.player.embedHtml,
            image: `https://img.youtube.com/vi/${vidData.id}/mqdefault.jpg`,
            videoId: vidData.id,
            channelId: vidData.snippet.channelId,
            channelIcon: ''
          };
          arr.push(parsedData);
          channelIDsArr.push(vidData.snippet.channelId)
        });

        // console.log(channelIDsObj)
        setVideosData(arr);
        // console.log(channelIDsArr);

        //2nd API call return to get ChalnnelIcons
        return axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIDsArr.join(',')}&fields=items(id%2Csnippet%2Fthumbnails)&key=${APIKey}`);
      })
      .then(response => {
        const resData = response.data;
        resData.items.forEach(channelData => {
          channelIDsObj[channelData.id] = channelData.snippet.thumbnails.high.url;          
        })

        for (const id in channelIDsObj) {          
          
          // Sets the channel icon data to the state
          // Does some comparison and set apropriate data in the state
          setVideosData(prevVidsData => {
            const dataFound = prevVidsData.findIndex(vidData => {
              return vidData.channelId === id
            })

            const updatedVideosData = [ 
              ...prevVidsData,
              {
                ...prevVidsData[dataFound],
                ...prevVidsData[dataFound].channelIcon = channelIDsObj[id]
              }
            ]
            return updatedVideosData;
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });      
  }, []);

  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Home videosData={videosData} />
      {/* <Trending videosData={parseVidsData(videosData, 188, 100)} /> */}
    </div>
  );
}

export default App;
