import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import {AuthContext} from '../context/auth'

function MenuBar() {
  const pathname = window.location.pathname
  const path = pathname === '/' ? 'home' : pathname.substr(1) 
  const [activeItem, setActiveItem] = useState(path)

  const {user, logout} = useContext(AuthContext)

  const handleItemClick = (e, { name }) => setActiveItem(name)

  const menuBar = user ? (
    <Menu>
      <Menu.Item
        active
        as={Link}
        to="/"
      >
        {user.username}
      </Menu.Item>

      <Menu.Menu position = 'right'>
      <Menu.Item
        onClick={logout}
      >
        Logout
      </Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}
        to="/"
      >
        Home
      </Menu.Item>

      <Menu.Menu position = 'right'>
      <Menu.Item
        name='register'
        active={activeItem === 'register'}
        onClick={handleItemClick}
        as={Link}
        to="/register"
      >
        Register
      </Menu.Item>

      <Menu.Item
        name='login'
        active={activeItem === 'login'}
        onClick={handleItemClick}
        as={Link}
        to="/login"
      >
        Login
      </Menu.Item>
      </Menu.Menu>
    </Menu>
  )

  return menuBar
}

export default MenuBar;
