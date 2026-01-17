import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

import "../../utilities.css";
import { get, post } from "../../utilities";
import "./Login.css";
import { UserContext } from "../App";

const Skeleton = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  return (
    <>
      <div className="Parent-container">
        <div className="Title-container">
          <h1 className="Title-content">second nature</h1>
          <h2 className="Subtitle-content">practice in sync. perfect your form.</h2>
        </div>
        <div className="Buttons-parent">
          <button className="Button-container">
            <span className="Button-content">about</span>
          </button>
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
      </div>
    </>
  );
};

export default Skeleton;
