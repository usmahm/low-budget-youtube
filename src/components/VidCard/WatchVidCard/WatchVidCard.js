import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { parseText } from "../../../shared/utilities";

import "./WatchVidCard.scss";

const WatchVidCard = (props) => {
  const videoDetails = props.videoDetails;

  const [noOfTitleChars, setNoOfTitleChars] = useState(0);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const resizeHandler = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    if (videoDetails) {
      if (windowSize < 900) {
        setNoOfTitleChars(windowSize / 11);
      } else if (windowSize < 1100) {
        setNoOfTitleChars(windowSize / 35);
      } else if (windowSize) {
        setNoOfTitleChars(windowSize / 33);
      }
    }
  }, [windowSize, videoDetails]);

  useEffect(() => {
    console.log(noOfTitleChars);
  }, [noOfTitleChars]);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
  }, []);

  return (
    <li>
      <Link
        to={`/watch?videoId=${videoDetails.videoId}`}
        className="watch-vid-card"
      >
        <div className="img-container">
          <div>
            <img src={videoDetails.image} alt={videoDetails.title} />
            <p className="duration">{videoDetails.duration}</p>
          </div>
        </div>
        <div className="details">
          <h3>{parseText(videoDetails.title, noOfTitleChars)}</h3>
          <p className="channel__name">{videoDetails.channelName}</p>
          <p>
            {videoDetails.viewCount} views <span className="s-circle"></span>{" "}
            <span className="date-posted">{videoDetails.datePosted}</span>
          </p>
        </div>
      </Link>
    </li>
  );
};

export default React.memo(
  WatchVidCard,
  (prevProps, nextProps) =>
    prevProps.videoDetails.viewCount === nextProps.videoDetails.viewCounts
);
