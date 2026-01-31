import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../utilities.css";
import { post } from "../../utilities";
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

  const onFileChange = async (event) => {
    const file = event.target.files[0];
    await onFileUpload(file);
  };

  const onFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("video", file);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      const data = await res.json();
      navigate("/play", { state: { uploadedVideoUrl: data.url } });
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
  };
  return (
    <>
      <div className="Upload-parent-container u-flexColumn u-flex-justifyCenter">
        <div className="Upload-title-container">
          <h1 className="Upload-title-content">second nature</h1>
          <h2 className="Upload-subtitle-content">practice in sync. perfect your form.</h2>
        </div>
        <div className="Upload-buttons-parent">
          <button
            className="Upload-buttons-container"
            onClick={() => setOpen((prev) => (prev === "about" ? null : "about"))}
          >
            <span className="Button-content">about</span>
          </button>
          <input id="videoUpload" type="file" onChange={onFileChange} style={{ display: "none" }} />
          <button
            className="Upload-buttons-container"
            onClick={() => {
              document.getElementById("videoUpload").click();
            }}
          >
            <span className="Button-content">upload video</span>
          </button>
          <button
            className="Upload-buttons-container"
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
              onSubmit={async (e) => {
                e.preventDefault();
                if (!youtubeLinkValid) {
                  alert("Please enter a YouTube link!");
                  return;
                }
                try {
                  await post("/api/videos", { videoUrl: youtubeLink });
                  navigate("/view", { state: { youtubeLink } });
                } catch (error) {
                  alert("Error uploading video link. Please try again.");
                  console.error("Error uploading video link:", error);
                }
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
