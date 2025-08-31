import React, { useRef, useState } from 'react';

export default function SteamTrain() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="fullscreen-video-container">
      <video
        ref={videoRef}
        src="https://res.cloudinary.com/diub150us/video/upload/v1756451188/trains_gcqbkm.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
     
      <button className="video-toggle-btn" onClick={toggleVideo}>
        {isPlaying ? 'Pause Video' : 'Play Video'}
      </button>
    </div>
  );
}

