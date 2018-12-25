import React from 'react';
import './SettingsButton.css';

class SettingsButton extends React.Component{

  onButtonClick = () => {
    this.props.onSettingsButtonClick();
  };
    
  
  render () {
    return (
      <div onClick={this.onButtonClick}className="settings-button">
        <p>{`▹ ${(this.props.showSettings === true) ? 'hide' : 'show'} settings`}</p>
      </div>
    )
  }
}

export default SettingsButton;