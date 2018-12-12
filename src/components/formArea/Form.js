import React from 'react';
import InputTimes from './InputTimes';
import DataList from './DataList';
import './Form.css';


class Form extends React.Component {
  state = {
    room: '',
    start: '09:00',
    end: '09:15',
    roomToAdd: ''
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value})
  }

  onAddRoomSubmit = event => {
    event.preventDefault();
    this.props.onAddRoomSubmit(this.state.roomToAdd);
    this.setState({"roomToAdd":""});
  }


  render () {
    return (
        <div className="forms">
          <form>
            <input autoComplete="off" name="room" list="rooms" onChange={this.onInputChange} value={this.state.room} type="text" placeholder="room... (optional)"></input>
            <DataList list="rooms" data={this.props.data}/>
            <select name="start" onChange={this.onInputChange} value={this.state.start} type="text">
              <InputTimes />
            </select>
            <select name="end" onChange={this.onInputChange} value={this.state.end} type="text">
              <InputTimes start={this.state.start}/>
            </select>
            <input type="submit" value="find room"></input>
          </form>
          <form onSubmit={this.onAddRoomSubmit}>
            <input autoComplete="off" name="roomToAdd" value={this.state.roomToAdd} onChange={this.onInputChange} type="text" placeholder="room..."></input>
            <input type="submit" value="add room"></input>
          </form>
        </div>
    )
  }
}

export default Form;