import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Peer from "simple-peer";
import { Container } from "reactstrap";

const socket = io("http://localhost:5050"); // Update if deployed

export default function Room() {
  const { id: roomID } = useParams();
  const [peers, setPeers] = useState([]);
  const userVideo = useRef();
  const peersRef = useRef([]);
  const streamRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      streamRef.current = stream;
      userVideo.current.srcObject = stream;

      socket.emit("join room", roomID);

      socket.on("all users", users => {
        const peerObjs = users.map(userID => {
          const peer = createPeer(userID, socket.id, stream);
          peersRef.current.push({ peerID: userID, peer });
          return { peerID: userID, peer };
        });
        setPeers(peerObjs);
      });

      socket.on("user joined", payload => {
        const peer = addPeer(payload.signal, payload.callerID, stream);
        peersRef.current.push({ peerID: payload.callerID, peer });

        setPeers(prev => [...prev, { peerID: payload.callerID, peer }]);
      });

      socket.on("receiving returned signal", payload => {
        const item = peersRef.current.find(p => p.peerID === payload.id);
        item?.peer.signal(payload.signal);
      });
    });
  }, []);

  function createPeer(userToSignal, callerID, stream) {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    });

    peer.on("signal", signal => {
      socket.emit("sending signal", { userToSignal, callerID, signal });
    });

    return peer;
  }

  function addPeer(incomingSignal, callerID, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream
    });

    peer.on("signal", signal => {
      socket.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }

  return (
    <Container className="d-flex flex-wrap justify-content-center">
      <video ref={userVideo} autoPlay playsInline muted style={{ width: "30%" }} />
      {peers.map((p, idx) => (
        <Video key={idx} peer={p.peer} />
      ))}
    </Container>
  );
}

function Video({ peer }) {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", stream => {
      ref.current.srcObject = stream;
    });
  }, [peer]);

  return <video ref={ref} autoPlay playsInline style={{ width: "30%" }} />;
}