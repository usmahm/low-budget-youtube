import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

import { parseText } from "../../../shared/utilities";
import Avatar from "@material-ui/core/Avatar";
import "./SearchResultCard.scss";

const SearchResultCard = (props) => {
  let detailsDiv = useRef();
  const vidData = props.videosData;
  let [noOfDescChars, setNoOfDescChars] = useState(0);
  const [noOfTitleChars, setNoOfTitleChars] = useState(0);
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const resizeHandler = () => {
    setWindowSize(window.innerWidth)
  };

  useEffect(() => {
    if (vidData) {
      if (windowSize < 292) {
        setNoOfDescChars(windowSize / 17);
        setNoOfTitleChars(windowSize / 11);
      } else if (windowSize < 1200) {
        setNoOfDescChars(windowSize / 9);
        setNoOfTitleChars(windowSize / 28);
      } else  {
        setNoOfDescChars(windowSize / 9);
        setNoOfTitleChars(windowSize / 18);
      }

    }
  }, [windowSize, vidData]);

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
  }, []);

  return (
    <Link to={`/watch?videoId=${vidData.videoId}`} className="search-res-card">
      <div className="img-container">
        <div>
          <img src={vidData.image} alt={vidData.title} />
          <p className="duration">{vidData.duration}</p>
        </div>
      </div>
      <div className="details" ref={detailsDiv}>
        <div className="details__text">
          <h3>{parseText(vidData.title, noOfTitleChars)}</h3>
          <p>
            {vidData.viewCount} <span className="s-circle"></span>{" "}
            {vidData.datePosted}
          </p>
          <div className="details__channel">
            <span className="c-img">
              <Avatar src={vidData.channelIcon} className="icon" />
            </span>
            <p>{vidData.channelName}</p>
          </div>
          <p className="details__description">{parseText(vidData.description, noOfDescChars)}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
