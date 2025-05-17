

import React from 'react';
import { Row, Col } from 'reactstrap';
import Video from './Video';

const VideoGrid = ({ userVideoRef, peers }) => {
  return (
    <div className="p-3">
      <Row className="g-3">
        <Col xs="12" sm="6" md="4" lg="3">
          <video ref={userVideoRef} autoPlay playsInline muted style={{ width: "100%", borderRadius: "8px" }} />
        </Col>
        {peers.map((peerObj, index) => (
          <Col xs="12" sm="6" md="4" lg="3" key={index}>
            <Video peer={peerObj.peer} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VideoGrid;