import React from 'react';
import DataList from './DataList';
import InputTimes from './InputTimes';
import './Form.css';

// this component renders forms based on the input given from FormList.js (see there for more info)

const timeArray = [
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00"
]

class Form extends React.Component {
  state = {
    start:"09:00",
    end:"09:15",
    room: '',
    email: '',
    password: ''
  }

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value})
  }


  //see InputTimes.js for explanation for this function
  componentDidUpdate (prevProps) {
    const indexStart = timeArray.indexOf(this.state.start);
    const indexEnd = timeArray.indexOf(this.state.end);
    if (indexEnd < indexStart) {
      this.setState({ "end": timeArray[indexStart + 1]})
    }
  }

  onRoomFormSubmit = event => {
    event.preventDefault();
    this.props.formAction({
      roomName: this.state.room,
      start: this.state.start,
      end: this.state.end
    })
    this.setState({ "room": '' });
  }

  onUserFormSubmit = event => {
    event.preventDefault();
    this.props.formAction({
      email: this.state.email,
      password: this.state.password
    })
    this.setState({ email: '', password: '' });
  }

  render () {
    if (this.props.userForm) {
      return (
        <form onSubmit={this.onUserFormSubmit}>
          <input className="input-user input-user--email" autoComplete="off" name="email" onChange={this.onInputChange} value={this.state.email} type="text" placeholder="email..."></input>
          {!this.props.deleteForm && <input className="input-user input-user--password" autoComplete="off" name="password" onChange={this.onInputChange} value={this.state.password} type="text" placeholder="password..."></input>} 
          <input className="submit-button" type="submit" value={this.props.buttonValue}></input>
        </form>
      )
    }
    
    return(
      <form onSubmit={this.onRoomFormSubmit}>
        <input className="input-room" autoComplete="off" name="room" list={this.props.datalistName} onChange={this.onInputChange} value={this.state.room} type="text" placeholder="room..."></input>
        <DataList required={this.props.DataListRequired} id={this.props.datalistName} data={this.props.data}/>
        {!this.props.noSelect &&
        <select name="start" onChange={this.onInputChange} value={this.state.start} type="text">
          <InputTimes />
        </select>}
        {!this.props.noSelect &&
        <select name="end" onChange={this.onInputChange} value={this.state.end} type="text">
          <InputTimes start={this.state.start}/>
        </select>}
        <input className="submit-button" type="submit" value={this.props.buttonValue}></input>
      </form>
    )
    
    
  }
}

export default Form;