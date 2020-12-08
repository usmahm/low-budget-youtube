import React from "react";

import HomeVidCard from "../../components/VidCard/HomeVidCard/HomeVidCard";

import "./Home.scss";

const MainPage = (props) => {
  return (
    <main className="home">
      {props.videosData.map((vidData) => (
        <HomeVidCard key={vidData.videoId} videosData={vidData} />
      ))}
    </main>
  );
};

export default MainPage;
