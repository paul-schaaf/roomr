import React from 'react';
import './ErrorMessage.css';

/*
* this component renders an error message on the top of the screen. more info in App.js
*/
class ErrorMessage extends React.Component {

  onErrorButtonClick = event => {
    this.props.onErrorButtonClick();
  }

  render () {
    return (
      <div className="error-message">
        <p>{this.props.errorMessage}</p>
        <button type="button" onClick={this.onErrorButtonClick}>X</button>
      </div>
    )
  }
}

export default ErrorMessage;
