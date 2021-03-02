import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

export const Header = () => {
  return (
    <nav id="header">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/bin-days">Bin Days</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header;