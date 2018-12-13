import React from 'react';
import FormList from './formArea/FormList';
import RoomList from './infoArea/RoomList';
import TimeLine from './infoArea/TimeLine';
import ErrorPage from './errorPages/ErrorPage';
import roomrapi from '../apis/roomrapi';
import './App.css';
import errorHandler from '../errorHandling/axiosErrorHandling';
import ErrorMessage from './errorPages/ErrorMessage';

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

  onBlockRoomSubmit = async (reqData) => {
    await errorHandler(roomrapi.blockRoom, this, reqData);
    await errorHandler(roomrapi.setRoomDataOnce, this);
  }

  onUnblockRoomSubmit = async (reqData) => {
    await errorHandler(roomrapi.unblockRoom, this, reqData);
    await errorHandler(roomrapi.setRoomDataOnce, this);
  }

  onErrorButtonClick = () => {
    this.setState({ "errorMessage": ''});
  }
  
  render() {
    if (this.state.getStatus === "pending") {
      return <div>Loading...</div>
    } else if (this.state.getStatus === "failed") {
      return <ErrorPage />
    } else if (this.state.errorMessage !== '') {
      return (
        <React.Fragment>
          <ErrorMessage errorMessage={this.state.errorMessage} onErrorButtonClick={this.onErrorButtonClick}/>
          <div className="form-area">
            <FormList
              data={this.state.data}
              onAddRoomSubmit={this.onAddRoomSubmit} 
              onDeleteRoomSubmit={this.onDeleteRoomSubmit}
              onBlockRoomSubmit={this.onBlockRoomSubmit}
              onUnblockRoomSubmit={this.onUnblockRoomSubmit}
            />
          </div>
          <div className="info-area">
              <TimeLine />
            <div className="room-area">
              <RoomList data={this.state.data}/>
              
            </div>
          </div>
        </React.Fragment>
      )
    }else if (this.state.getStatus === "successful" && this.state.data.length > 0){
      return (
        <React.Fragment>
          <div className="form-area">
            <FormList
              data={this.state.data}
              onAddRoomSubmit={this.onAddRoomSubmit} 
              onDeleteRoomSubmit={this.onDeleteRoomSubmit}
              onBlockRoomSubmit={this.onBlockRoomSubmit}
              onUnblockRoomSubmit={this.onUnblockRoomSubmit}
            />
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
      return (
        <div className="form-area">
          <FormList
            data={this.state.data}
            onAddRoomSubmit={this.onAddRoomSubmit} 
            onDeleteRoomSubmit={this.onDeleteRoomSubmit}
            onBlockRoomSubmit={this.onBlockRoomSubmit}
            onUnblockRoomSubmit={this.onUnblockRoomSubmit}
          />
        </div>
      )
    }
  }
}

export default App;