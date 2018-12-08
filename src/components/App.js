import React from 'react';
import Form from './Form';
import RoomList from './RoomList';
import TimeLine from './TimeLine';
import getData from '../apis/getData';
import './App.css';
class App extends React.Component {
  state = {
    status: "pending",
    data: []
  };

  async componentDidMount() {
    try {
      const response = await getData();
      this.setState({ data: response , status: "successful"});
    } catch(err) {
      this.setState({ status: "failed"});
    }
  };
    
  
  render() {
    if (this.state.status === "pending") {
      return <div>Loading...</div>
    } else if (this.state.status === "failed") {
      return <div>There is something wrong with your connection or the server. Please check your connection or try later</div>
    } else {
      return (
        <React.Fragment>
          <div>{this.state.data[0].name}</div>
          <div className="form-area">
            <Form />
          </div>
          <div className="info-area">
              <TimeLine />
            <div className="room-area">
              <RoomList data={this.state.data}/>
              
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default App;