import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import "../../utilities.css";
import { get } from "../../utilities";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

// page for user profile and saved videos

const Profile = () => {
  const user = useContext(UserContext);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  // retrieve videos from backend storage
  useEffect(() => {
    get("/api/videos/mine")
      .then((videos) => setVideos(videos))
      .catch((error) => console.error(error));
  }, []);

  // convert account creation date to text
  const dateToText = (creationString) => {
    const date = new Date(creationString);
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <>
      {/* profile screen & stats */}
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

      {/* saved stuff */}
      <div className="Saved-container">
        {videos.length == 0 && <p className="No-videos">No saved videos yet.</p>}

        {/* grid of video thumbnail tiles, clickable to play 
        diff video types for youtube vs uploaded */}
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
              {/* delete single video */}
              <button
                className="Delete-button"
                onClick={(e) => {
                  // when delete button clicked, stay on page and delete from front + back end
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
              {video.type === "youtube" ? ( // load diff metadata for youtube vs uploaded
                <img src={video.thumbnail} alt={video.title} className="Video-thumbnail" />
              ) : (
                <video src={video.url} className="Video-thumbnail" />
              )}

              <div className="Video-title">{video.title}</div>
            </div>
          ))}
        </div>

        {/* delete all videos */}
        {videos.length > 0 && (
          <button
            className="Clear-button"
            onClick={() => {
              if (!confirm("Clear all saved videos? This action cannot be undone.")) return;
              console.log("DELETE URL:", `/api/videos/`);
              fetch("/api/videos", { method: "DELETE", credentials: "include" }).then(
                () => setVideos([]) // clear all from front end, send delete all req to back end
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
