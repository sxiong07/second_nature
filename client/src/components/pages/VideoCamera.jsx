import React, { useContext } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { UserContext } from "../App";

import "../../utilities.css";
import "./VideoCamera.css";
import Webcam from "../modules/Webcam";
import VideoLink from "../modules/VideoLink";

const VideoCamera = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return (
    <>
    <div>
      {userId ? (
              <button
                onClick={() => {
                  googleLogout();
                  handleLogout();
                }}
              >
                Logout
              </button>
            ) : (
              <GoogleLogin onSuccess={handleLogin} onError={(err) => console.log(err)} />
            )}
    </div>
    <div className="VideoCamera-container">
      
      <div className="VideoCamera-camera">
        <VideoLink />
      </div>
      <div className="VideoCamera-video">
        <Webcam />
      </div>
    </div>
    </>
  );
};

export default VideoCamera;
