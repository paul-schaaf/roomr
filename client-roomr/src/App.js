import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BookingApp from './components/bookingApp/BookingApp';
import AdminPage from './components/adminPage/AdminPage';
import LoginPage from './components/loginPage/LoginPage';

class App extends React.Component {
  render () {
    return (
      <Router>
        <React.Fragment>
        <Route path="/app/:id/admin" exact component={AdminPage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/login/:type" exact component={LoginPage} />
        <Route path="/app/:id" exact component={BookingApp} />    
        </React.Fragment>
      </Router>
    );
  }
}


export default App;