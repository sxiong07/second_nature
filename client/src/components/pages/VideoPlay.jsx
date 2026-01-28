import React, { useRef, useState } from "react";
import "./VideoPlay.css";
import Webcam from "../modules/Webcam";
import { useLocation } from "react-router-dom";

const VideoPlay = () => {
  const videoRef = useRef(null);
  const location = useLocation();

  const uploadedVideoUrl = location.state?.uploadedVideoUrl;
  if (!uploadedVideoUrl) return <div className="No-videos">No video uploaded.</div>;
  console.log("Uploaded Video URL:", uploadedVideoUrl);

  // various setting that we need
  const [loopSetting, setLoopSetting] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(60);

  function playVideo() {
    // try to get the video
    const video = videoRef.current;
    if (!video) return;

    // set loop or not loop, the speed, and the start time as requested
    video.loop = loopSetting;
    video.playbackRate = playbackSpeed;
    video.currentTime = startTime;

    video.play();
  }

  // "set" / pause the video at the end time
  function handleTimeUpdate() {
    const video = videoRef.current;
    if (!video) return;

    if (video.currentTime >= endTime) {
      video.pause();
    }
  }

  // including various setting buttons and boxes
  return (
    <div className="Video-container">
      <div className="VideoPlay-container">
        <video ref={videoRef} src={uploadedVideoUrl} controls onTimeUpdate={handleTimeUpdate} />
        <div className="VideoPlay-controls">
          <button onClick={() => setLoopSetting((prev) => !prev)}>
            {loopSetting ? "Unloop Video" : "Loop Video"}
          </button>
          <label>
            Playback Speed
            <input
              type="number"
              step="0.1"
              min="0.1"
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            />
          </label>
          <label>
            Start Time (seconds)
            <input
              type="number"
              step="0.1"
              min="0"
              value={startTime}
              onChange={(e) => setStartTime(Number(e.target.value))}
            />
          </label>
          <label>
            End Time (seconds)
            <input
              type="number"
              step="0.1"
              min="0"
              value={endTime}
              onChange={(e) => setEndTime(Number(e.target.value))}
            />
          </label>
          <button onClick={playVideo}>Play</button>
        </div>
      </div>
      <div className="VideoCamera-video">
        <Webcam />
      </div>
    </div>
  );
};

export default VideoPlay;
