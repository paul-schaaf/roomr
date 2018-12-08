import React from 'react';
import './Form.css';



class Form extends React.Component {
  state = {
    room: '',
    start: '',
    end: ''
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value})
  }



  render () {
    return (
      <div className="form">
        <form>
          <input name="room" onChange={this.onInputChange} value={this.state.room} type="text" placeholder="room number"></input>
          <input name="start" onChange={this.onInputChange} value={this.state.start} type="text" placeholder="from"></input>
          <input name="end" onChange={this.onInputChange} value={this.state.end} type="text" placeholder="to"></input>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}

export default Form;