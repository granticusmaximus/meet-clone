// src/pages/Register.jsx
import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert, Container } from 'reactstrap';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter both first and last name');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h3>Register</h3>
      <Form onSubmit={handleRegister}>
        {error && <Alert color="danger">{error}</Alert>}
        <FormGroup>
          <Label for="firstName">First Name</Label>
          <Input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>
          <Input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </FormGroup>
        <Button type="submit" color="primary" block>Register</Button>
      </Form>
    </Container>
  );
}