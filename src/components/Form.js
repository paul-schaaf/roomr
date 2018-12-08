import React from 'react';
import './Form.css';



class Form extends React.Component {
  state = {
    room: '',
    start: '09:00',
    end: '09:15'
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value})
  }



  render () {
    return (
      <div className="form">
        <form>
          <input name="room" onChange={this.onInputChange} value={this.state.room} type="text" placeholder="room number"></input>
          <select name="start" onChange={this.onInputChange} value={this.state.start} type="text">
            <option value="09:00">09:00</option>
            <option value="09:15">09:15</option>
            <option value="09:30">09:30</option>
          </select>
          <select name="end" onChange={this.onInputChange} value={this.state.end} type="text">
            <option value="09:15">09:15</option>
            <option value="09:30">09:30</option>
            <option value="09:45">09:45</option>
          </select>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}

export default Form;