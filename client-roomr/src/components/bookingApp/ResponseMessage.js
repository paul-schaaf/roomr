import React from 'react';
import './ResponseMessage.css';

/*
* this component renders an error message on the top of the screen. more info in App.js
*/
class ResponseMessage extends React.Component {
  state =  {
    background: '#1E4363',
    buttonBackground: '#1E4363',
    buttonColor: 'white'
  }



  componentDidMount = async () => {
    if (this.props.clientError) {
      await this.setState({ background: '#BC2D19' });
      await this.setState({ buttonBackground: this.state.background });
      this.setState({ buttonColor: 'white' });
    }
  }

  onMessageButtonClick = event => {
    this.props.onMessageButtonClick();
  }

  onIsHovered = () => {
    this.setState({ buttonBackground: 'white' });
    this.setState({ buttonColor: this.state.background });
  }

  onIsNotHovered = () => {
    this.setState({ buttonBackground: this.state.background });
    this.setState({ buttonColor: 'white'});
  }

  render () {
    return (
      <div style={{ background: this.state.background }} className="response-message">
        {this.props.responseMessage !== 'loading' && 
        <p className="response-message__text">{this.props.responseMessage}</p>}
        {this.props.responseMessage !== 'loading' && <button
        style={{ background: this.state.buttonBackground, color: this.state.buttonColor }}
        onMouseEnter={this.onIsHovered}
        onMouseLeave={this.onIsNotHovered}
        className="response-message-button"
        type="button"
        onClick={this.onMessageButtonClick}>X</button>}
        {this.props.responseMessage === 'loading' &&
        <div className="response-message__loading-box"></div>}
      </div>
    )
  }
}

export default ResponseMessage;
