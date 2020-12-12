import React, { useEffect, useReducer } from "react";

import useHttp from "../../hooks/useHttp";
import WatchVidCard from "../../components/VidCard/WatchVidCard/WatchVidCard";
import AboutVid from "../../components/WatchVid/AboutVids/AboutVid";

import "./WatchVid.scss";

import {
  parseDuration,
  parseTime,
  parseText,
  parseNumber,
} from "../../shared/utilities";

const initialState = {
  relatedVideos: null,
  videoDetails: null,
};

const watchVidReducer = (curState, action) => {
  switch (action.type) {
    case "SET":
      return { ...curState, videoDetails: action.videoDetails };
    case "SET_RELATED_VIDEOS":
      return { ...curState, relatedVideos: action.relatedVideos };
    case "SET_RELATED_VIDEOS_VIEW_COUNT":
      const videoDataArray = [ ...curState.relatedVideos ];

      Array.from(action.vidsData).forEach((vidData) => {
        // const viewCount = vidData.statistics.viewCount;
        videoDataArray.forEach((videoData, index) => {
          if (videoData.videoId === vidData.id) {
            videoDataArray[index].viewCount = parseNumber(vidData.statistics.viewCount);
            videoDataArray[index].duration = parseDuration(vidData.contentDetails.duration);
          }
        });
      });
      return {
        ...curState,
        videosData: videoDataArray,
      };

    case "SET_SUBSCRIBER_COUNT":
      return {
        ...curState,
        videoDetails: {
          ...curState.videoDetails,
          subscriberCount: action.subscriberCount,
        },
      };
    case "SET_VID_CHANNEL_ICON":
      return {
        ...curState,
        videoDetails: {
          ...curState.videoDetails,
          channelIcon: action.channelIcon,
        },
      };
    default:
      throw new Error("Shoould not be reached");
  }
};

const WatchVid = (props) => {
  const [watchVidState, dispatchWatchVid] = useReducer(
    watchVidReducer,
    initialState
  );
  const { sendRequest, data, reqExtra } = useHttp();
  let videoId = "EXLgZZE072g";

  const APIKey = "AIzaSyC0-Cu83uFnN2GDL04ISyf8NO674ElR2P8";
  let CORSAnywhereURL = "https://cors-anywhere.herokuapp.com/";
  const regionCode = "CD";
  CORSAnywhereURL = "";

  useEffect(() => {
    sendRequest(
      `${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${APIKey}`
    );
  }, [sendRequest, videoId, CORSAnywhereURL]);

  useEffect(() => {
    if (data) {
      if (!reqExtra) {
        const vidData = data.items[0];
        console.log(vidData.statistics.likeCount)
        const videoData = {
          title: vidData.snippet.title,
          datePosted: vidData.snippet.publishedAt,
          videoId: vidData.id,
          channelID: vidData.snippet.channelId,
          channelName: vidData.snippet.channelTitle,
          viewCount: parseNumber(
            vidData.statistics.viewCount,
            "SEPERATE_BY_COMMA"
          ),
          dislikeCount: parseNumber(vidData.statistics.dislikeCount),
          likeCount: parseNumber(vidData.statistics.likeCount),
          description: vidData.snippet.description,
          subscriberCount: "",
        };
        console.log(vidData.statistics.dislikeCount, videoData);
        dispatchWatchVid({ type: "SET", videoDetails: videoData });
        sendRequest(
          `${CORSAnywhereURL}https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${vidData.snippet.channelId}&key=${APIKey}`,
          {
            identifier: "SUBSCRIBER_COUNT",
          }
        );

        sendRequest(
          `${CORSAnywhereURL}https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${vidData.snippet.channelId}&fields=items(id%2Csnippet%2Fthumbnails)&key=${APIKey}`,
          {
            identifier: "GET_CHANNEL_ICON",
          }
        );
        sendRequest(
          `${CORSAnywhereURL}https://youtube.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${videoId}&maxResults=20&type=video&key=${APIKey}`,
          {
            identifier: "RELATED_VIDEOS",
          }
        );
      } else if (reqExtra.identifier === "SUBSCRIBER_COUNT") {
        dispatchWatchVid({
          type: "SET_SUBSCRIBER_COUNT",
          subscriberCount: parseNumber(
            data.items[0].statistics.subscriberCount
          ),
        });
      } else if (reqExtra.identifier === "GET_CHANNEL_ICON") {
        dispatchWatchVid({
          type: "SET_VID_CHANNEL_ICON",
          channelIcon: data.items[0].snippet.thumbnails.high.url,
        });
      } else if (reqExtra.identifier === "RELATED_VIDEOS") {
        console.log(data);
        const videoDataArray = [];
        const relatedVideosId = [];

        data.items.forEach((vidData, index) => {
          if (vidData.snippet) {
            const parsedData = {
              channelName: vidData.snippet.channelTitle,
              title: parseText(vidData.snippet.title, 50),
              datePosted: parseTime(vidData.snippet.publishedAt),
              image: `https://img.youtube.com/vi/${vidData.id.videoId}/hqdefault.jpg`,
              videoId: vidData.id.videoId,
            };
            videoDataArray.push(parsedData);
            relatedVideosId.push(vidData.id.videoId);
          }
        });
        console.log(videoDataArray);
        dispatchWatchVid({
          type: "SET_RELATED_VIDEOS",
          relatedVideos: videoDataArray,
        });
        sendRequest(
          `https://youtube.googleapis.com/youtube/v3/videos?part=statistics%2CcontentDetails&id=${relatedVideosId.join(
            ","
          )}&key=${APIKey}`,
          {
            identifier: "GET_RELATED_VIDEOS_DATA",
          }
        );
      } else if (reqExtra.identifier === "GET_RELATED_VIDEOS_DATA") {
        console.log(data);
        dispatchWatchVid({type: 'SET_RELATED_VIDEOS_VIEW_COUNT', vidsData: data.items})
      }
    }
  }, [data, reqExtra, CORSAnywhereURL, sendRequest, videoId]);

  return (
    <div className="watchvid-page">
      <div className="video">
        <div className="video__container">
          <div>
            <iframe
              title="name"
              src={`//www.youtube.com/embed/${videoId}`} // ADD Later ?autoplay=1&mute=1
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="video__details">
          {watchVidState.videoDetails ? (
            <AboutVid videoDetails={watchVidState.videoDetails} />
          ) : null}
        </div>
      </div>
      <div className="related-videos">
        {watchVidState.relatedVideos
          ? watchVidState.relatedVideos.map((videoData) => (
              <WatchVidCard key={videoData.videoId} videoDetails={videoData} />
            ))
          : null}
      </div>
    </div>
  );
};

export default WatchVid;
