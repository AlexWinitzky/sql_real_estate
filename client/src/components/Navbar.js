import React from 'react'
import { Menu, } from 'semantic-ui-react'
import { NavLink, } from 'react-router-dom'

const Navbar = () => {

  const rightNavItems = () => {
    return (
      <Menu.Menu position='right'>
        <Menu.Item>
          <NavLink
            exact
            to='/available'
            id='available'
            name='available'
            activeStyle={styles.active}
          >
            Listings
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink
            exact
            to='/cities'
            id='cities'
            name='cities'
            activeStyle={styles.active}
          >
            By City
        </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink
            exact
            to='/find_home'
            id='find_home'
            name='find_home'
            activeStyle={styles.active}
          >
            Find Home
        </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink
            exact
            to='/city_cost'
            id='city_cost'
            name='city_cost'
            activeStyle={styles.active}
          >
            Cost by City
        </NavLink>
        </Menu.Item>
      </Menu.Menu>
    )
  }

  return (
    <div>
      <Menu pointing secondary>
        <Menu.Item>
          <NavLink
            exact
            to='/'
            activeStyle={styles.active}
          >
            Home
        </NavLink>
        </Menu.Item>
        {rightNavItems()}
      </Menu>
    </div>
  )
}

const styles = {
  active: {
    fontWeight: '900',
    textDecoration: 'underline',
  }
}

export default Navbar;