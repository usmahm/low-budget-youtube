import React from "react";

import HomeVidCard from "../../components/VidCard/HomeVidCard/HomeVidCard";

import "./Home.scss";

const MainPage = (props) => {
  // console.log(props.videosData)
  return (
    <main className="home">
      {props.videosData.map((vidData) => (
        <HomeVidCard key={vidData.channelId} videosData={vidData} />
      ))}
    </main>
  );
};

export default MainPage;
