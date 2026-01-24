import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import { get, post } from "../../utilities";
import "./Login.css";
import "./Upload.css";
import { UserContext } from "../App";

const Login = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [showAbout, setShowAbout] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="Parent-container">
        <div className="Title-container">
          <h1 className="Title-content">second nature</h1>
          <h2 className="Subtitle-content">practice in sync. perfect your form.</h2>
        </div>
        <div className="Buttons-parent">
          <button className="Button-container" onClick={() => setShowAbout((prev) => !prev)}>
            <span className="Button-content">about</span>
          </button>
          {!userId && (
            <GoogleLogin
              onSuccess={handleLogin}
              onError={(err) => console.log(err)}
              theme="filled_blue"
              size="medium"
              shape="rectangular"
              text="signin_with"
            />
          )}
        </div>

        {showAbout && (
          <div className="About-container">
            <p className="Button-content">
              second nature is a movement-focused web platform designed to help you refine your
              skills through practice, reptition, and self-monitoring.
              <br /> <br /> Practice side-by-side with uploaded or YouTube reference videos while
              viewing your own camera feed in real time. Break movements down using customizable
              playback tools, including looping the video, clipping specific segments, and adjusting
              playback speed.
              <br /> <br />
              Whether you're dancing, working out, or practicing an instrument, second nature helps
              you practice in sync and perfect your form.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
