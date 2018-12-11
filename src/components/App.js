import React from 'react';
import Form from './Form';
import RoomList from './RoomList';
import TimeLine from './TimeLine';
import roomrapi from '../apis/roomrapi';
import ErrorPage from './ErrorPage';
import './App.css';
class App extends React.Component {
  state = {
    status: "pending",
    data: []
  };

  async componentDidMount() {
    try {
      const response = await roomrapi.getAllRooms();
      this.setState({ data: response , status: "successful"});
    } catch(err) {
      this.setState({ status: "failed"});
    }
    try {
      setInterval(async () => {
        const response = await roomrapi.getAllRooms();
        this.setState({ data: response , status: "successful"});
      }, 10000);
    } catch(err) {
      this.setState({ status: "failed"});
    }
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