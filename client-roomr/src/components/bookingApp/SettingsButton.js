/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import './SettingsButton.css';

class SettingsButton extends Component {
  onButtonClick = () => {
    this.props.onSettingsButtonClick();
  };


  render() {
    return (
      <div role="button" onClick={this.onButtonClick} className="settings-button">
        <p>{`▹ ${(this.props.showSettings === true) ? 'hide' : 'show'} settings`}</p>
      </div>
    );
  }
}

export default SettingsButton;
