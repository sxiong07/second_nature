import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { UserContext } from "../App";

import "../../utilities.css";
import "./VideoCamera.css";
import Webcam from "../modules/Webcam";
import VideoLink from "../modules/VideoLink";
import { useLocation } from "react-router-dom";

const VideoCamera = () => {
  const location = useLocation();
  const youtubeLink = location.state?.youtubeLink;
  let videoId = null;
  if (youtubeLink) {
    if (youtubeLink.includes("youtu.be/")) {
      videoId = youtubeLink.split("youtu.be/")[1];
    } else if (youtubeLink.includes("watch?v=")) {
      videoId = youtubeLink.split("watch?v=")[1];
    }
  }
  return (
    <>
      <div className="VideoCamera-container">
        <div className="VideoCamera-camera">
          <VideoLink videoId={videoId} />
        </div>
        <div className="VideoCamera-video">
          <Webcam />
        </div>
      </div>
    </>
  );
};

export default VideoCamera;
