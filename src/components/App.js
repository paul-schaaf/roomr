import React from 'react';
import Form from './formArea/Form';
import RoomList from './infoArea/RoomList';
import TimeLine from './infoArea/TimeLine';
import ErrorPage from './errorPages/ErrorPage';
import roomrapi from '../apis/roomrapi';
import './App.css';
import errorHandler from '../errorHandling/axiosErrorHandling';

class App extends React.Component {
  state = {
    getStatus: "pending",
    data: [],
    errorMessage:""
  };

  async componentDidMount() {
    await errorHandler(roomrapi.setRoomDataOnce, this);
    errorHandler(roomrapi.setRoomDataLoop, this);
  };
    
  onAddRoomSubmit = async (roomName) => {
    await errorHandler(roomrapi.addRoom, this, roomName);
    await errorHandler(roomrapi.setRoomDataOnce, this);
  }

  onDeleteRoomSubmit = async (roomName) => {
    await errorHandler(roomrapi.deleteRoom, this, roomName);
    await errorHandler(roomrapi.setRoomDataOnce, this);
  }
  
  render() {
    if (this.state.getStatus === "pending") {
      return <div>Loading...</div>
    } else if (this.state.getStatus === "failed") {
      return <ErrorPage />
    } else if (this.state.getStatus === "successful" && this.state.data.length > 0){
      return (
        <React.Fragment>
          <div className="form-area">
            <Form 
              data={this.state.data}
              onAddRoomSubmit={this.onAddRoomSubmit} 
              onDeleteRoomSubmit={this.onDeleteRoomSubmit}
            />
            <div className="test"><p className="text">Find Room</p></div>
          </div>
          <div className="info-area">
              <TimeLine />
            <div className="room-area">
              <RoomList data={this.state.data}/>
              
            </div>
          </div>
        </React.Fragment>
      )
    } else {
      return <div>Please add a Room.</div>
    }
  }
}

export default App;