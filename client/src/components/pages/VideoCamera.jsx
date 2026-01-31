import "../../utilities.css";
import "./VideoCamera.css";
import Webcam from "../modules/Webcam";
import VideoLink from "../modules/VideoLink";
import { useLocation } from "react-router-dom";

// page to view youtube reference video and own webcam video side by side

const VideoCamera = () => {
  const location = useLocation();
  const youtubeLink = location.state?.youtubeLink; // feed youtube video from upload page here, otherwise player has nothing
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
          <VideoLink videoId={videoId} /> {/* the youtube video */}
        </div>
        <div className="VideoCamera-video">
          <Webcam /> {/* you */}
        </div>
      </div>
    </>
  );
};

export default VideoCamera;
