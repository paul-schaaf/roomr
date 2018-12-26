import React from 'react';
import './ResponseMessage.css';

/*
* this component renders an error message on the top of the screen. more info in App.js
*/
class ResponseMessage extends React.Component {
  state =  {
    background: '',
    buttonBackground: '',
    buttonColor: ''
  }

  componentDidMount = async () => {
    await this.setState({ background: (this.props.clientError) ? '#BC2D19' : '#1E4363' });
    this.setState({ buttonBackground: this.state.background });
    this.setState({ buttonColor: 'white' });
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
        <p className="response-message__text">{this.props.responseMessage}</p>
        <button
        style={{ background: this.state.buttonBackground, color: this.state.buttonColor }}
        onMouseEnter={this.onIsHovered}
        onMouseLeave={this.onIsNotHovered}
        className="response-button"
        type="button"
        onClick={this.onMessageButtonClick}>X</button>
      </div>
    )
  }
}

export default ResponseMessage;
