import React from 'react';
import './ResponseMessage.css';

/*
* this component renders an error message on the top of the screen. more info in App.js
*/
class ResponseMessage extends React.Component {

  onMessageButtonClick = event => {
    this.props.onMessageButtonClick();
  }

  render () {
    return (
      <div className="response-message">
        <p className="response-message__text">{this.props.responseMessage}</p>
        <button className="response-button" type="button" onClick={this.onMessageButtonClick}>X</button>
      </div>
    )
  }
}

export default ResponseMessage;
