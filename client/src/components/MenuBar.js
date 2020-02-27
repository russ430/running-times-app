import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);

  const pathname = window.location.pathname;
  
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu style={{ padding: '0 4rem', margin: '0' }} inverted size="large" color="teal">
      <Menu.Item
        name='home'
        as={Link}
        to='/'
        onClick={handleItemClick}
      />
      {user ? (
        <Menu.Item
          name="my profile"
          as={Link}
          to={`/profile/${user.username}`}
          onClick={handleItemClick}
        />
      ) : null}
      <Menu.Menu position='right'>
        {/* if the user is logged in, render a log out button.
        if the user is logged out, render the login fields */}
        {user ? (
          <Menu.Item
            name='logout'
            onClick={logout}
          />
        ) : (
          <>
          <Menu.Item
            name='login'
            onClick={handleItemClick}
            as={Link}
            to='/login'
          />
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to='/register'
          />
        </>
        )}
      </Menu.Menu>
    </Menu>
  );
};

export default MenuBar;
