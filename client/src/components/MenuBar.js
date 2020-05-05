import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AuthContext } from '../context/auth';

export default function MenuBar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Menu>
      <div style={{ padding: '1rem 0' }}>
        <MenuItem to="/">Home</MenuItem>
        {user ? (
          <MenuItem to={`/profile/${user.username}`}>My Profile</MenuItem>
        ) : null}
      </div>
      <div>
        {user ? (
          <MenuItem onClick={logout}>Logout</MenuItem>
        ) : (
          <>
            <MenuItem to="/login">Login</MenuItem>
            <MenuItem to="/register">Register</MenuItem>
          </>
        )}
      </div>
    </Menu>
  );
}

const Menu = styled.div`
  display: flex;
  padding: 0;
  color: #fff;
  align-items: center;
  justify-content: space-between;
  background-color: #00b5ad;

  @media screen and (min-width: 1200px) {
    padding: 0 4rem;
  }
`;

const MenuItem = styled(Link)`
  font-size: 1.1rem;
  color: hsla(0, 0%, 100%, 0.9);
  padding: 1rem 1.1rem;

  &:not(:last-child) {
    border-right: 1px solid rgba(34, 36, 38, 0.15);
  }
`;
