import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../utilities.css";
import { get, post } from "../../utilities";
import "./Upload.css";
import { UserContext } from "../App";

const Upload = () => {
  const { userId, handleLogin, handleLogout } = useContext(UserContext);
  const [open, setOpen] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [youtubeLink, setYoutubeLink] = useState("");
  const youtubeLinkValid =
    youtubeLink &&
    (youtubeLink.startsWith("http://youtu") ||
      youtubeLink.startsWith("https://youtu") ||
      youtubeLink.startsWith("https://www.youtube") ||
      youtubeLink.startsWith("youtu"));

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile, selectedFile.name);
    console.log(selectedFile);
    // send to database here
  };
  return (
    <>
      <div className="Parent-container">
        <div className="Title-container">
          <h1 className="Title-content">second nature</h1>
          <h2 className="Subtitle-content">practice in sync. perfect your form.</h2>
        </div>
        <div className="Buttons-parent">
          <button
            className="Button-container"
            onClick={() => setOpen((prev) => (prev === "about" ? null : "about"))}
          >
            <span className="Button-content">about</span>
          </button>
          <input id="videoUpload" type="file" onChange={onFileChange} style={{ display: "none" }} />
          <button
            className="Button-container"
            onClick={() => {
              alert(
                "video upload not available yet!"
              ); /*document.getElementById("videoUpload").click()*/
            }}
          >
            <span className="Button-content">upload video</span>
          </button>
          <button
            className="Button-container"
            onClick={() => setOpen((prev) => (prev === "link" ? null : "link"))}
          >
            <span className="Button-content">video link</span>
          </button>
        </div>

        {open === "about" && (
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

        {open === "link" && (
          <div className="About-container">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!youtubeLinkValid) {
                  alert("Please enter a YouTube link!");
                  return;
                }
                localStorage.setItem("lastYoutubeLink", youtubeLink);
                navigate("/view", { state: { youtubeLink } });
              }}
            >
              <input
                className="Youtube-input"
                type="text"
                placeholder="Paste YouTube link and press Enter"
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
              />
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Upload;
