import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { FiLogOut } from "react-icons/fi";
import "../../utilities.css";
import { get, post } from "../../utilities";
import "./Upload.css";
import { UserContext } from "../App";

const Upload = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [showAbout, setShowAbout] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {userId ? (
        <button
          className="Logout-container"
          onClick={() => {
            googleLogout();
            handleLogout();
            navigate("/");
          }}
        >
          <FiLogOut />
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
      <div className="Parent-container">
        <div className="Title-container">
          <h1 className="Title-content">second nature</h1>
          <h2 className="Subtitle-content">practice in sync. perfect your form.</h2>
        </div>
        <div className="Buttons-parent">
          <button className="Button-container" onClick={() => setShowAbout((prev) => !prev)}>
            <span className="Button-content">about</span>
          </button>
          <button
            className="Button-container"
            onClick={() => {
              /*ADA BACKEND*/
            }}
          >
            <span className="Button-content">upload video</span>
          </button>
        </div>

        {showAbout && (
          <div className="About-container">
            <span className="Button-content">
              Sample text for now. Just for MVP. Would ideally make another whole webpage? Idk. I
              wanna animate this but it's 3 am so not right now. What else do I say. Meow.
            </span>
            {/*console.log("e")*/}
          </div>
        )}
      </div>
    </>
  );
};

export default Upload;
