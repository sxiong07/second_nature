import React, { useContext, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

import "../../utilities.css";
import "./Login.css";
import "./Upload.css";
import { UserContext } from "../App";

// initial login page, after log in, functions as about page

const Login = () => {
  const { userId, handleLogin } = useContext(UserContext);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      {/* title + subtitle */}
      <div className="Login-parent-container u-flex u-flex-alignCenter u-flex-justifyCenter u-flexColumn">
        <h1 className="Login-title-content body --white u-bold">second nature</h1>
        <h2 className="Login-subtitle-content body">practice in sync. perfect your form.</h2>

        {/* about button */}
        <div className="Login-button-parent u-flex-alignCenter u-flex u-gap-20px">
          <button className="Login-button-container" onClick={() => setShowAbout((prev) => !prev)}>
            <span className="Login-button-content">about</span>
          </button>

          {/* login button */}
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

        {/* about dropdown */}
        {showAbout && (
          <div className="Login-about-container u-flex u-flex-justifyCenter">
            <p className="Login-button-content u-flex">
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
