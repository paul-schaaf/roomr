import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BookingPage from './components/bookingPage/BookingPage';

class App extends React.Component {
  render () {
    return (
      <Router>
        <Route path="/" exact component={BookingPage} />
        <BookingPage />
      </Router>
    );
  }
}


export default App;