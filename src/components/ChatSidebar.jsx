import React, { useState, useEffect } from 'react';
import { Input, Button, ListGroup, ListGroupItem } from 'reactstrap';
import io from 'socket.io-client';

const socket = io('http://localhost:5050'); // Adjust if deployed

const ChatSidebar = ({ roomId, username }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatUsers, setChatUsers] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.emit('join chat', { roomId, username });

    socket.on('chat message', message => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('chat users', users => {
      setChatUsers(users);
    });

    return () => {
      socket.off('chat message');
      socket.off('chat users');
    };
  }, [roomId, username]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const messageData = {
        roomId,
        user: username || 'Anonymous',
        text: newMessage,
        time: new Date().toLocaleTimeString()
      };
      socket.emit('chat message', messageData);
      setMessages(prev => [...prev, messageData]);
      setNewMessage('');
    }
  };

  return (
    <div className="p-3 border-start" style={{ width: '300px', height: '100vh', overflowY: 'auto' }}>
      <h5>Chat</h5>
      <div className="mb-3">
        <strong>Users in chat:</strong>
        <ul className="list-unstyled mb-0">
          {chatUsers.map((user, idx) => (
            <li key={idx}>• {user}</li>
          ))}
        </ul>
      </div>
      <ListGroup flush className="mb-3">
        {messages.map((msg, idx) => (
          <ListGroupItem key={idx}>
            <strong>{msg.user}</strong> <small className="text-muted">[{msg.time}]</small>
            <div>{msg.text}</div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <Input
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message..."
      />
      <Button color="primary" block onClick={sendMessage} className="mt-2">Send</Button>
    </div>
  );
};

export default ChatSidebar;