import React from 'react';
import './LoginPage.css';

class LoginPage extends React.Component {
  state = {
    tab: 'login' ,
    loginColor: '#1E4363',
    createColor: '#152F45',
    submitValue: 'login',
    entityValue: '',
    username: '',
    password: ''
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

  render () {
    return (
      <div className="login-page">
        <div className="login-box">
          <div className="login-box__tabs">
            <div style={{ background: this.state.loginColor }} onClick={this.onLoginTab} >Login</div>
            <div style={{ background: this.state.createColor }} onClick={this.onCreateTab} >Create</div>
          </div>
          <div className="login-box__form-box">
            <form action={`/api/${this.state.tab}`} method="POST">
              <input
                name="entityValue"
                onChange={this.onInputChange}
                className="login-box__form-box__input"
                type="text"
                placeholder="entity...">
              </input>
              <input
                name="username"
                onChange={this.onInputChange}
                className="login-box__form-box__input"
                type="text"
                placeholder="email...">
              </input>
              <input
                name="password"
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