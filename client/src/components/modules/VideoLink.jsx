import React from 'react';
import Youtube from 'react-youtube-embed';

const VideoLink = () => {
    return (
        <div className = "video-container"> 
            <Youtube id="9YxCFnL4BgY" /> {/*insert real video ID here*/}
        </div>
    );
};

export default VideoLink;