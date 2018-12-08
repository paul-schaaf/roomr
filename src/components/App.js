import React from 'react';
import Form from './Form';
import './App.css';
import Room from './Room';
import TimeLine from './TimeLine';
class App extends React.Component {
  render() {
    return (
      <React.Fragment>
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

export default App;