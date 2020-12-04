import React from "react";

import TrendingVidCard from "../../components/VidCard/TrendingVidCard/TrendingVidCard";

import "./Trending.scss";

const Trending = (props) => {
    console.log(props.videosData)
  return (
    <div className="trending">
      {props.videosData.map((vidData) => (
        <TrendingVidCard videosData={vidData} />
      ))}
    </div>
  );
};

export default Trending;
