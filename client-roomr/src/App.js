import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BookingPage from './components/bookingPage/BookingPage';
import AdminPage from './components/adminPage/AdminPage';
import LoginPage from './components/loginPage/LoginPage';

class App extends React.Component {
  render () {
    return (
      <Router>
        <React.Fragment>
          <Route path="/" exact component={BookingPage} />
          <Route path="/admin" exact component={AdminPage} />
          <Route path="/login" exact component={LoginPage} />
        </React.Fragment>
      </Router>
    );
  }
}


export default App;