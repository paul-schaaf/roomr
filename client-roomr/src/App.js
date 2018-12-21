import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BookingPage from './components/bookingPage/BookingPage';
import AdminPage from './components/adminPage/AdminPage';

class App extends React.Component {
  render () {
    return (
      <Router>
        <React.Fragment>
          <Route path="/" exact component={BookingPage} />
          <Route path="/admin" exact component={AdminPage} />
        </React.Fragment>
      </Router>
    );
  }
}


export default App;