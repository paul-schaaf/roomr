import React from 'react';
import './ErrorMessage.css';

/*
* this component renders an error message on the top of the screen. more info in App.js
*/
class ErrorMessage extends React.Component {

  onErrorButtonClick = event => {
    this.props.onMessageButtonClick();
  }

  render () {
    return (
      <div className="error-message">
        <p className="error-message__text">{this.props.errorMessage}</p>
        <button className="error-button" type="button" onClick={this.onErrorButtonClick}>X</button>
      </div>
    )
  }
}

export default ErrorMessage;
