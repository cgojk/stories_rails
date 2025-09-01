

import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

export default function PodcastControls({ audioUrl }) {
  return (
    <div className="audio-player">
      <AudioPlayer
        src={audioUrl}
        autoPlay={false}
        layout="horizontal"
        showJumpControls={false}          // hides ⏮ ⏭
        showSkipControls={false}          // hides next/prev track buttons
        customAdditionalControls={[]}     // no extra buttons
        customVolumeControls={[]}         // no volume slider
        showFilledProgress={true}         // keep the progress bar optional
      />
    </div>
  );
}