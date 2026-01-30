import Youtube from "react-youtube-embed";

const VideoLink = ({ videoId }) => {
  return (
    <div className="VideoLink-container u-flex">
      {videoId && <Youtube id={videoId} />}
    </div>
  );
};

export default VideoLink;
