import React from 'react';

class ErrorMessage extends React.Component {

  onErrorButtonClick = event => {
    this.props.onErrorButtonClick();
  }

  render () {
    return (
      <div>
        <p>{this.props.errorMessage}</p>
        <button type="button" onClick={this.onErrorButtonClick}>X</button>
      </div>
    )
  }
}

export default ErrorMessage;
