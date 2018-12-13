import React from 'react';
import InputTimes from './InputTimes';
import DataList from './DataList';
import './FormList.css';

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

  onBlockRoomSubmit = event => {
    event.preventDefault();
    this.props.onBlockRoomSubmit({
      "roomName": this.state.roomBlock,
      "start": this.state.startBlock,
      "end": this.state.endBlock
    });
    this.setState({"roomBlock":""});
  }

  onUnblockRoomSubmit = event => {
    event.preventDefault();
    this.props.onUnblockRoomSubmit({
      "roomName": this.state.roomUnblock,
      "start": this.state.startUnblock,
      "end": this.state.endUnblock
    });
    this.setState({"roomUnblock":""});
  }

  componentDidUpdate (prevProps) {
    const indexStartBlock = timeArray.indexOf(this.state.startBlock);
    const indexEndBlock = timeArray.indexOf(this.state.endBlock);
    if (indexEndBlock < indexStartBlock) {
      this.setState({ "endBlock": timeArray[indexStartBlock + 1]})
    }
    const indexStartUnblock = timeArray.indexOf(this.state.startUnblock);
    const indexEndUnblock = timeArray.indexOf(this.state.endUnblock);
    if (indexEndUnblock < indexStartUnblock) {
      this.setState({ "endUnblock": timeArray[indexStartUnblock + 1]})
    }
  }

  render () {
    return (
        <div className="forms">
          <form onSubmit={this.onBlockRoomSubmit}>
            <input className="input-room" autoComplete="off" name="roomBlock" list="roomBlock" onChange={this.onInputChange} value={this.state.roomBlock} type="text" placeholder="room..."></input>
            <DataList list="roomBlock" data={this.props.data}/>
            <select name="startBlock" onChange={this.onInputChange} value={this.state.startBlock} type="text">
              <InputTimes />
            </select>
            <select name="endBlock" onChange={this.onInputChange} value={this.state.endBlock} type="text">
              <InputTimes start={this.state.startBlock}/>
            </select>
            <input className="submit-button" type="submit" value="▹ reserve room"></input>
          </form>
          <form onSubmit={this.onUnblockRoomSubmit}>
            <input className="input-room" autoComplete="off" name="roomUnblock" list="roomsUnblock" onChange={this.onInputChange} value={this.state.roomUnblock} type="text" placeholder="room..."></input>
            <DataList list="roomsUnblock" data={this.props.data}/>
            <select name="startUnblock" onChange={this.onInputChange} value={this.state.startUnblock} type="text">
              <InputTimes />
            </select>
            <select name="endUnblock" onChange={this.onInputChange} value={this.state.endUnblock} type="text">
              <InputTimes start={this.state.startUnblock}/>
            </select>
            <input className="submit-button" type="submit" value="▹ unblock room"></input>
          </form> 
          <form onSubmit={this.onAddRoomSubmit}>
            <input className="input-room" autoComplete="off" name="roomToAdd" value={this.state.roomToAdd} onChange={this.onInputChange} type="text" placeholder="room..."></input>
            <input className="submit-button" type="submit" value="▹ add room"></input>
          </form>
          <form onSubmit={this.onDeleteRoomSubmit}>
            <input className="input-room" autoComplete="off" name="roomToDelete" list="roomDeleteList" value={this.state.roomToDelete} onChange={this.onInputChange} type="text" placeholder="room..."></input>
            <DataList list="roomDeleteList" data={this.props.data}/>
            <input className="submit-button" type="submit" value="▹ delete room"></input>
          </form>
        </div>
    )
  }
}

export default Form;