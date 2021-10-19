import React from 'react';
import { Link } from 'react-router-dom';
import dickerLogoSquare from '../images/dickerLogoSquare.png';
import './Nav.css';

class Nav extends React.Component {
  render() {
    return (
      <div className={'navbar'}>
          <ul>
            <li><img className={'navLogo'} src={dickerLogoSquare} alt={'dickerNOW logo'} /></li>
            <li><Link to='/dashboard'>Dashboard</Link></li>
            <li><Link to='/settings'>Settings</Link></li>
            <li><Link to='/'> Logout </Link></li>
          </ul>
          <div className={'navRight'}>
            <h3>Welcome, Merchant!</h3>
          </div>

      </div>
    );
  }
}

export default Nav;
