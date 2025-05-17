import React, { useEffect, useRef } from 'react';

const Video = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on('stream', stream => {
      if (ref.current) {
        ref.current.srcObject = stream;
      }
    });

    // Optional cleanup
    return () => {
      peer.removeAllListeners('stream');
    };
  }, [peer]);

  return <video ref={ref} autoPlay playsInline style={{ width: '100%', borderRadius: '8px' }} />;
};

export default Video;