import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import BookingApp from './components/bookingApp/BookingApp';
import LoginPage from './components/loginPage/LoginPage';

class App extends React.Component {
  render () {
    return (
      <Router>
        <React.Fragment>
        <Route path="/app/:id/:isAdmin" exact component={BookingApp} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/login/:type" exact component={LoginPage} />
        <Route path="/app/:id" exact component={BookingApp} />  
        <Route path="/" exact render={ () => <Redirect to="/login"/> }/>
        </React.Fragment>
      </Router>
    );
  }
}


export default App;