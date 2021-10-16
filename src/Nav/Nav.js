import React from 'react';
import { Link } from 'react-router-dom';
import dickerNowLogo from '../images/dickerNowLogo.png';
import './Nav.css';

class Nav extends React.Component {
  render() {
    return (
      <div className={'navbar'}>
        <div className={'navLeft'}>
          <img className={'navLogo'} src={dickerNowLogo} alt={'dickerNOW logo'} height={'25'} width={'75'} />
          <Link to='/'>Dashboard</Link>
          <Link to='/settings'>Settings</Link>
          <a href={''}> Logout </a>
          <div className={'navRight'}>
            <h3>Welcome, Merchant!</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
