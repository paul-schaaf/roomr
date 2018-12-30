/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './ResponseMessage.css';

/*
* this component renders an error message on the top of the screen. more info in App.js
*/
class ResponseMessage extends React.Component {
  state = {
    background: '#1E4363',
    buttonBackground: '#1E4363',
    buttonColor: 'white',
  }

  componentDidMount = async () => {
    if (this.props.clientError) {
      await this.setState({ background: '#BC2D19' });
      await this.setState(prevState => ({ buttonBackground: prevState.background }));
      this.setState({ buttonColor: 'white' });
    }
  }

  onMessageButtonClick = () => {
    this.props.onMessageButtonClick();
  }

  /**
   * normal css hover isn't possible for this component since
   * its background is either blue or red
   * hence the button's background needs to change dynamically
   * with the background of the LoginMessage
   */
  onIsHovered = () => {
    this.setState({ buttonBackground: 'white' });
    this.setState(prevState => ({ buttonColor: prevState.background }));
  }

  onIsNotHovered = () => {
    this.setState(prevState => ({ buttonBackground: prevState.background }));
    this.setState({ buttonColor: 'white' });
  }

  render() {
    return (
      <div style={{ background: this.state.background }} className="response-message">
        {this.props.responseMessage !== 'loading'
        && <p className="response-message__text">{this.props.responseMessage}</p>}
        {this.props.responseMessage !== 'loading' && (
        <button
          style={{ background: this.state.buttonBackground, color: this.state.buttonColor }}
          onMouseEnter={this.onIsHovered}
          onMouseLeave={this.onIsNotHovered}
          className="response-message-button"
          type="button"
          onClick={this.onMessageButtonClick}
        >
        X
        </button>
        )}
        {this.props.responseMessage === 'loading'
        && <div className="response-message__loading-box" />}
      </div>
    );
  }
}

export default ResponseMessage;
