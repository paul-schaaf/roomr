import React from 'react';
import Form from './Form';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="form-area">
          <Form />
        </div>
      </React.Fragment>
    )
  }
}

export default App;