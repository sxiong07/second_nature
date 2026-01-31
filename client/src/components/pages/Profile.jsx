import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import "../../utilities.css";
import { get } from "../../utilities";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useContext(UserContext);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    get("/api/videos/mine")
      .then((videos) => setVideos(videos))
      .catch((error) => console.error(error));
  }, []);

  const dateToText = (creationString) => {
    const date = new Date(creationString);
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      <div className="Profile-container">
        <img src={user.userProfilePic} className="Profile-avatar" />
        <h1 className="Profile-name">{user.userName}</h1>
        <div className="Profile-all-stats-container">
          <div className="Profile-stat-container">
            <h2 className="Profile-stats-label">daily logins</h2>
            <h3 className="Profile-stats-number">{user.userLoginStreak}</h3>
          </div>
          <div className="Profile-stat-container">
            <h2 className="Profile-stats-label">current projects</h2>
            <h3 className="Profile-stats-number">{videos.length}</h3>
          </div>
          <div className="Profile-stat-container">
            <h2 className="Profile-stats-label">account created</h2>
            <h3 className="Profile-stats-number">{dateToText(user.userCreationDate)}</h3>
          </div>
        </div>
      </div>

      <div className="Saved-container">
        {videos.length == 0 && <p className="No-videos">No saved videos yet.</p>}

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
                  fetch(`/api/videos/${video._id}?type=${video.type}`, {
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
      </div>
    </>
  );
};

export default Profile;
