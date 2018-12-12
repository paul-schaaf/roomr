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
    status: "pending",
    data: [],
    errorInfo: {
      code:"",
      message:""
    }
  };

  async componentDidMount() {
    await errorHandler(roomrapi.setRoomDataInit, this);
    errorHandler(roomrapi.setRoomDataLoop, this);
  };
    
  
  render() {
    if (this.state.status === "pending") {
      return <div>Loading...</div>
    } else if (this.state.status === "failed") {
      return <ErrorPage />
    } else if (this.state.status === "successful" && this.state.data.length > 0){
      return (
        <React.Fragment>
          
          <div className="form-area">
            <Form data={this.state.data}/>
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