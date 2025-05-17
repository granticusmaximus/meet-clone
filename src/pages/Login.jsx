// src/pages/Login.jsx
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Container } from 'reactstrap';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h3>Login</h3>
      <Form onSubmit={handleLogin}>
        {error && <Alert color="danger">{error}</Alert>}
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </FormGroup>
        <Button type="submit" color="primary" block>Login</Button>
      </Form>
    </Container>
  );
}