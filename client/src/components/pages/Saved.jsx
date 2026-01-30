import React, { useEffect, useState } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import "../../utilities.css";
import { get } from "../../utilities";
import "./Saved.css";

const Saved = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    get("/api/videos/mine")
      .then((videos) => setVideos(videos))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="Profile-container">
      {videos.length == 0 && <p className="No-videos">No saved videos yet.</p>}
      {videos.length > 0 && (
        <button
          className="Clear-button"
          onClick={() => {
            if (!confirm("Clear all saved videos? This action cannot be undone.")) return;
            console.log("DELETE URL:", `/api/videos/`);
            fetch("/api/videos", { method: "DELETE", credentials: "include" }).then(() =>
              setVideos([])
            );
          }}
        >
          Clear All
        </button>
      )}
      <div className="Video-count">Number of videos: {videos.length}</div>
      <div className="Video-grid">
        {videos.map((video) => (
          <div
            key={video._id}
            className="Video-card"
            onClick={() =>
              navigate(video.type === "youtube" ? "/view" : "/play", {
                state:
                  video.type === "youtube"
                    ? { youtubeLink: `https://www.youtube.com/watch?v=${video.youtubeId}` }
                    : { uploadedVideoUrl: video.url },
              })
            }
          >
            <button
              className="Delete-button"
              onClick={(e) => {
                e.stopPropagation();
                fetch(`/api/videos/${video._id}`, {
                  method: "DELETE",
                  credentials: "include",
                }).then(() => {
                  setVideos((prev) => prev.filter((v) => v._id != video._id));
                });
              }}
            >
              ✕
            </button>
            {video.type === "youtube" ? (
              <img src={video.thumbnail} alt={video.title} className="Video-thumbnail" />
            ) : (
              <video className="Video-thumbnail" src={video.url} muted preload="metadata" />
            )}

            <div className="Video-title">{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
