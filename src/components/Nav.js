import React from 'react';
import { Link } from 'gatsby';
import NavStyles from './styles/nav.module.css';

export default function Nav() {
  return (
    <nav className={NavStyles.nav}>
      <ul>
        <li>
          <Link activeClassName="active" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link activeClassName="active" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link activeClassName="active" to="/tips">
            Tips
          </Link>
        </li>
      </ul>
    </nav>
  );
}
