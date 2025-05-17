

import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

const Controls = ({ stream }) => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !audioEnabled;
      });
      setAudioEnabled(!audioEnabled);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !videoEnabled;
      });
      setVideoEnabled(!videoEnabled);
    }
  };

  return (
    <div className="text-center my-3">
      <ButtonGroup>
        <Button color={audioEnabled ? 'danger' : 'secondary'} onClick={toggleAudio}>
          {audioEnabled ? 'Mute Mic' : 'Unmute Mic'}
        </Button>
        <Button color={videoEnabled ? 'danger' : 'secondary'} onClick={toggleVideo}>
          {videoEnabled ? 'Stop Video' : 'Start Video'}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Controls;