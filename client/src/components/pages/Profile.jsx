import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import "../../utilities.css";
import { get } from "../../utilities";
import "./Profile.css";

const Profile = () => {
  const user = useContext(UserContext);
  const [videos, setVideos] = useState([]);

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
    <div className="Profile-container">
      <img src={user.userProfilePic} className="Profile-avatar" />
      <h1 className="Profile-name">{user.userName}</h1>
      <div className="Profile-all-stats-container">
        <div className="Profile-stat-container">
          <h2 className="Profile-stats-label">daily logins</h2>
          <h3 className="Profile-stats-number">{user.userLoginStreak || 0}</h3>
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
  );
};

export default Profile;
