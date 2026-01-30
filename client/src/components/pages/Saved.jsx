import React, { useEffect, useState } from "react";
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
    <div className="Saved-profile-container u-flexColumn u-flex-justifyCenter">
      {videos.length == 0 && <p className="Saved-no-videos">No saved videos yet.</p>}
      {videos.length > 0 && (
        <button
          className="Saved-clear-button u-flex-justifyCenter u-flex-alignCenter u-pointer"
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

      <div className="Saved-video-grid">
        {videos.map((video) => (
          <div
            key={video._id}
            className="Saved-video-card u-flexColumn u-flex-alignCenter u-pointer"
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
              className="Saved-delete-button u-textCenter u-flex-alignCenter u-flex-justifyCenter u-pointer"
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
              <img src={video.thumbnail} alt={video.title} className="Saved-video-thumbnail" />
            ) : (
              <video className="Saved-video-thumbnail" src={video.url} muted preload="metadata" />
            )}

            <div className="Saved-video-title u-flexColumn u-flex-alignCenter u-flex-justifyCenter u-textCenter">{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Saved;
