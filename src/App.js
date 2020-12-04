import React from 'react';

import Sidebar from './containers/Sidebar/Sidebar';
import Header from './containers/Header/Header';
import Home from './containers/Home/Home';
import Trending from './containers/Trending/Trending';

import { parseDuration, parseTime, parseText, parseViewCount } from './shared/utilities';

import data from './data';
import './App.scss';


const videosData = data.items;



const parseVidsData = (vidsData, noOfDescriptionChars, noOfTitleChars) => {
    console.log(vidsData)
    const parsedData = [];
    
    vidsData.forEach(vidData => {
        const data = {
          viewCount: parseViewCount(vidData.statistics.viewCount),
          channelName: vidData.snippet.channelTitle,
          description: parseText(vidData.snippet.description, noOfDescriptionChars),
          title: parseText(vidData.snippet.title, noOfTitleChars),
          duration: parseDuration(vidData.contentDetails.duration),
          datePosted: parseTime(vidData.snippet.publishedAt),
          embedHTML: vidData.player.embedHtml,
          image: vidData.snippet.thumbnails.standard.url,
          videoId: vidData.id
        }  

        parsedData.push(data)
    });

    return parsedData;
}

const parsedVidsData = parseVidsData(videosData)
// console.log(videosData)
console.log(parsedVidsData)


function App() {
  // console.log(parsedVidsData)
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Home videosData={parseVidsData(videosData, 50, 50)} />
      {/* <Trending videosData={parseVidsData(videosData, 188, 100)} /> */}
    </div>
  );
}

export default App;
