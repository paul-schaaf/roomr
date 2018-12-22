import React from 'react';
//import axios from 'axios';
import './LoginPage.css';

class LoginPage extends React.Component {
  state = {
    tab: 'login' ,
    loginColor: '#1E4363',
    createColor: '#152F45',
    submitValue: 'login',
    entityValue: '',
    emailValue: '',
    passwordValue: ''
  };

  onLoginTab = () => {
    this.setState({ tab: 'login', loginColor: '#1E4363', createColor: '#152F45' });
  }

  onCreateTab = () => {
    this.setState({ tab: 'create', loginColor: '#152F45', createColor: '#1E4363' });
  }

  onInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  /*onFormSubmit = async event => {
    event.preventDefault();
    await axios.post('/login', {
      username: this.state.emailValue,
      password: this.state.passwordValue
    })
  } */

  render () {
    return (
      <div className="login-page">
        <div className="login-box">
          <div className="login-box__tabs">
            <div style={{ background: this.state.loginColor }} onClick={this.onLoginTab} >Login</div>
            <div style={{ background: this.state.createColor }} onClick={this.onCreateTab} >Create</div>
          </div>
          <div className="login-box__form-box">
            <form >
              <input
                name="entityValue"
                onChange={this.onInputChange}
                className="login-box__form-box__input"
                type="text"
                placeholder="entity...">
              </input>
              <input
                name="emailValue"
                onChange={this.onInputChange}
                className="login-box__form-box__input"
                type="text"
                placeholder="email...">
              </input>
              <input
                name="passwordValue"
                onChange={this.onInputChange}
                className="login-box__form-box__input"
                type="password"
                placeholder="password...">
              </input>
              <input
                className="login-submit"
                type="submit"
                value={this.state.tab}>
              </input>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage;