import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth() || {};
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate('/login');
  };

  return (
    <Navbar color="dark" dark expand="md">
      <NavbarBrand tag={Link} to="/">GWS Meet</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ms-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/">Home</NavLink>
          </NavItem>
          
          {!currentUser ? (
            <>
              <NavItem>
                <NavLink tag={Link} to="/login">Login</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/register">Register</NavLink>
              </NavItem>
            </>
          ) : (
            <NavItem>
              <NavLink href="#" onClick={handleLogout}>Logout</NavLink>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavigationBar;