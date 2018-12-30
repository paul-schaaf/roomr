import React from 'react';
import './LoginMessage.css';

class LoginMessage extends React.Component {
  state = {
    message: '',
    background: '',
    buttonBackground: '',
  };

  async componentDidMount() {
    if (this.props.info === 'loginFail') {
      await this.setState({ message: 'Incorrect login info ', background: '#BC2D19' });
    } else if (this.props.info === 'createSuccess') {
      await this.setState({ message: 'Entity created. You can now log in.', background: '#1E4363' });
    } else if (this.props.info === 'createFail') {
      await this.setState({ message: 'This entity exists already.', background: '#BC2D19' });
    } else if (this.props.info === 'createNone') {
      await this.setState({ message: 'Please enter an entity name.', background: '#BC2D19' });
    } else if (this.props.info === 'createFailEmail') {
      await this.setState({ message: 'Please enter a valid email.', background: '#BC2D19' });
    }
    this.setState(prevState => ({ buttonBackground: prevState.background }));
  }

  onButtonClick = () => {
    this.props.onButtonClick();
  }

  /**
   * normal css hover isn't possible for this component since
   * its background is either blue or red
   * hence the button's background needs to change dynamically
   * with the background of the LoginMessage
   */
  onIsHovered = () => {
    this.setState({ buttonBackground: 'white' });
  }

  onIsNotHovered = () => {
    this.setState(prevState => ({ buttonBackground: prevState.background }));
  }

  render() {
    return (
      <div style={{ background: this.state.background }} className="login-message-box">
        <p>{this.state.message}</p>
        <button
          style={{
            background: this.state.buttonBackground,
          }}
          onMouseEnter={this.onIsHovered}
          onMouseLeave={this.onIsNotHovered}
          className={`login-button login-button--${this.props.info}`}
          type="button"
          onClick={this.onButtonClick}
        >
          X
        </button>
      </div>
    );
  }
}

export default LoginMessage;
