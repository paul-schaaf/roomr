import React from 'react';
import InputTimes from './InputTimes';
import DataList from './DataList';
import './Form.css';


class Form extends React.Component {
  state = {
    roomBlock: '',
    startBlock: '09:00',
    endBlock: '09:15',
    roomUnblock: '',
    startUnblock: '09:00',
    endUnblock: '09:15',
    roomToAdd: '',
    roomToDelete: ''
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value})
  }

  onAddRoomSubmit = event => {
    event.preventDefault();
    this.props.onAddRoomSubmit(this.state.roomToAdd);
    this.setState({"roomToAdd":""});
  }

  onDeleteRoomSubmit = event => {
    event.preventDefault();
    this.props.onDeleteRoomSubmit(this.state.roomToDelete);
    this.setState({"roomToDelete":""});
  }

  render () {
    return (
        <div className="forms">
          <form>
            <input autoComplete="off" name="roomBlock" list="rooms" onChange={this.onInputChange} value={this.state.roomBlock} type="text" placeholder="room..."></input>
            <DataList list="rooms" data={this.props.data}/>
            <select name="startBlock" onChange={this.onInputChange} value={this.state.startBlock} type="text">
              <InputTimes />
            </select>
            <select name="endBlock" onChange={this.onInputChange} value={this.state.endBlock} type="text">
              <InputTimes start={this.state.startBlock}/>
            </select>
            <input type="submit" value="reserve room"></input>
          </form>
          <form>
            <input autoComplete="off" name="roomUnblock" list="roomsUnblock" onChange={this.onInputChange} value={this.state.roomUnblock} type="text" placeholder="room..."></input>
            <DataList list="roomsUnblock" data={this.props.data}/>
            <select name="startUnblock" onChange={this.onInputChange} value={this.state.startUnblock} type="text">
              <InputTimes />
            </select>
            <select name="endUnblock" onChange={this.onInputChange} value={this.state.endUnblock} type="text">
              <InputTimes start={this.state.startUnblock}/>
            </select>
            <input type="submit" value="unblock room"></input>
          </form>
          <form onSubmit={this.onAddRoomSubmit}>
            <input autoComplete="off" name="roomToAdd" value={this.state.roomToAdd} onChange={this.onInputChange} type="text" placeholder="room..."></input>
            <input type="submit" value="add room"></input>
          </form>
          <form onSubmit={this.onDeleteRoomSubmit}>
            <input autoComplete="off" name="roomToDelete" value={this.state.roomToDelete} onChange={this.onInputChange} type="text" placeholder="room..."></input>
            <input type="submit" value="delete room"></input>
          </form>
        </div>
    )
  }
}

export default Form;