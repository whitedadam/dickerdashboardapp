import React from "react";
import dickerNowLogo from './images/dickerNowLogo.png';
import './App.css';

class Nav extends React.Component {
    render() {
        return (
          <div className={'navbar'}>

              <div className={'navLeft'}>
                  <img className={'navLogo'} src={dickerNowLogo} alt={'dickerNOW logo'} height={'25'} width={'75'}/>
                  <a href={'./Dashboard.js'}> Dashboard </a>
                  <a href={''}> Settings </a>
                  <a href={''}> Logout </a>
                  <div className={'navRight'}>
                      <p><em><strong>Welcome, Merchant!</strong></em></p>
                  </div>
              </div>

          </div>
        );
    }
}

export default Nav;