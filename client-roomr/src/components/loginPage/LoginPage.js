import React from 'react';
import './LoginPage.css';

class LoginPage extends React.Component {
  render () {
    return (
      <div className="login-page">
        <div className="login-box">
          <div className="login-box__tabs">
            <div className="login-box__tabs__login">Login</div>
            <div className="login-box__tabs__create">Create</div>
          </div>
          <div className="login-box__form-box">
            <form>
              <input className="login-box__form-box__input" type="text" placeholder="entity..."></input>
              <input className="login-box__form-box__input"type="text" placeholder="email..."></input>
              <input className="login-box__form-box__input"type="text" placeholder="password..."></input>
              <input className="login-submit" type="submit" value="login"></input>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage;