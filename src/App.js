import React, { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "./containers/Sidebar/Sidebar";
import Header from "./containers/Header/Header";
import Home from "./containers/Home/Home";
import Trending from "./containers/Trending/Trending";
import WatchVid from './containers/WatchVid/WatchVid';

import {
  parseDuration,
  parseTime,
  parseText,
  parseViewCount,
} from "./shared/utilities";

// import data from "./data";
import "./App.scss";
const APIKey = "AIzaSyC0-Cu83uFnN2GDL04ISyf8NO674ElR2P8";
const CORSAnywhereURL = 'https://cors-anywhere.herokuapp.com/';

const App = () => {
  const [videosData, setVideosData] = useState([]);

  // Gets Videos Data from API
  useEffect(() => {
    console.log("[App.js] useEffect");

    // Remember - the country code has to be dynamic
    const regionCode = "CD";
    const videoDataArray = [];

    // First API call returns all data but channel Icons
    axios
      .get(
        `${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics%2Cplayer&chart=mostPopular&maxResults=20&regionCode=${regionCode}&key=${APIKey}`
      )
      .then((response) => {
        const resVidsData = response.data.items;

        // For Channel Icons
        const channelIDsArr = [];

        resVidsData.forEach((vidData) => {
          const parsedData = {
            viewCount: parseViewCount(vidData.statistics.viewCount),
            channelName: vidData.snippet.channelTitle,
            description: parseText(vidData.snippet.description, 50), //50
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
            setVideosData(videoDataArray);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <Header />
      {/* <Sidebar /> */}
      {/* <Home videosData={videosData} /> */}
      {/* <Trending videosData={videosData} /> */}
      {/* <Trending videosData={parseVidsData(videosData, 188, 100)} /> */}
      <WatchVid videosData={videosData} />
    </div>
  );
}

export default App;
