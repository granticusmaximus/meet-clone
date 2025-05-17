// src/pages/Profile.jsx

import React from 'react';
import { Container } from 'reactstrap';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function Profile() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Container className="mt-5">
      <h2>{currentUser.displayName?.split(' ')[0]}'s Profile</h2>
      <p><strong>Email:</strong> {currentUser.email}</p>
      {/* Add more fields or Firestore-linked data as needed */}
    </Container>
  );
}