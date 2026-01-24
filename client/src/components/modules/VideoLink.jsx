import React from "react";
import Youtube from "react-youtube-embed";

const VideoLink = ({ videoId }) => {
  return <div className="video-container">{videoId && <Youtube id={videoId} />}</div>;
};

export default VideoLink;
