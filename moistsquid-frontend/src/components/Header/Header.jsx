import React from 'react'
import { Link } from 'react-router-dom'

import './Header.css'

export const Header = () => {
  return (
    <nav id="header">
      <ul>
        <li>
          <Link to="/">Bin Days</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Header;