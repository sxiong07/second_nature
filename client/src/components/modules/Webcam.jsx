/* This is the page for the webcam + video displayed side by side */
import React, { useEffect, useRef } from 'react';
import './Webcam.css';

const Webcam = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {

          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((error) => {
          console.error("Something went wrong!", error);
        });
    } else {
      console.log("getUserMedia not supported.");
    }

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video 
        autoPlay={true} 
        ref={videoRef} 
        id="videoElement"
      />
      
    </div>
  );
};

export default Webcam;