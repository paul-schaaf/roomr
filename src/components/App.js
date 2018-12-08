import React from 'react';
import Form from './Form';
import Room from './Room';
import TimeLine from './TimeLine';
import './App.css';
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