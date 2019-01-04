/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import './LoginPage.css';
import LoginMessage from './LoginMessage';

class LoginPage extends Component {
  state = {
    tab: 'login',
    loginColor: '#1E4363',
    createColor: '#152F45',
    submitValue: 'login',
    entity: '',
    email: '',
    password: '',
    info: this.props.match.params.type,
  };

  onLoginTab = () => {
    this.setState({ tab: 'login', loginColor: '#1E4363', createColor: '#152F45' });
  }

  onCreateTab = () => {
    this.setState({ tab: 'create', loginColor: '#152F45', createColor: '#1E4363' });
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  getFormAction = () => ((this.state.tab === 'login') ? '/api/login' : '/api/entities')

  onButtonClick = () => {
    this.setState({ info: '' });
  }

  render() {
    return (
      <div className="login-page">
        <div className="login-box">
          {this.props.match.params && this.state.info
          && <LoginMessage onButtonClick={this.onButtonClick} info={this.state.info} />}
          <div className="login-box__tabs">
            <div role="button" style={{ background: this.state.loginColor }} onClick={this.onLoginTab}>Login</div>
            <div role="button" style={{ background: this.state.createColor }} onClick={this.onCreateTab}>Create</div>
          </div>
          <div className="login-box__form-box">
            <form
              action={this.getFormAction()}
              method="POST"
            >
              <input
                name="entity"
                onChange={this.onInputChange}
                className="login-box__form-box__input"
                type="text"
                placeholder="entity..."
              />
              <input
                name="email"
                onChange={this.onInputChange}
                className="login-box__form-box__input"
                type="text"
                placeholder="email..."
              />
              <input
                name="password"
                onChange={this.onInputChange}
                className="login-box__form-box__input"
                type="password"
                placeholder="password..."
              />
              <input
                className="login-submit"
                type="submit"
                value={this.state.tab}
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
