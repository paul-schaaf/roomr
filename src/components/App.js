import React from 'react';
import Form from './Form';
import Room from './Room';
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
    const data = response.data;
    this.setState({ data: data , status: "successful"});
    } catch (err) {
      console.error(err);
      this.setState({ status: "failed"});
    }
  }
  render() {
    if (this.state.status === "pending") {
      return <div>Loading...</div>
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
              <Room />
              <Room />
            </div>
          </div>
        </React.Fragment>
      )
    }
  }
}

export default App;