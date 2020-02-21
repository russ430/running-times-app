import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

export default function MenuBar() {
  const { user, logout } = useContext(AuthContext);

  const pathname = window.location.pathname;
  
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    <Menu style={{ padding: '0 4rem', margin: '0' }} inverted size="large" color="teal">
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        as={Link}
        to='/'
        onClick={handleItemClick}
      />
      <Menu.Item
        name="my profile"
        active={activeItem === 'my profile'}
        as={Link}
        to={`/profile/${user.username}`}
        onClick={handleItemClick}
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='logout'
          onClick={logout}
        />
      </Menu.Menu>
    </Menu>
  )
  : 
  (
    <Menu style={{ padding: '0 4rem'}} inverted size="large" color="teal">
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to='/'
      />
      <Menu.Menu position='right'>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
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
      </Menu.Menu>
    </Menu>
  )

  return menuBar;
};
