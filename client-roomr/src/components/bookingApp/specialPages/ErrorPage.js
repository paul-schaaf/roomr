import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

/*
* This component renders an error page. More info in BookingApp.js
*/

const ErrorPage = ({ loginMessage }) => {
  let message;
  if (loginMessage) {
    message = loginMessage;
  } else {
    message = 'There is something wrong with your connection or the server. Please check your connection or try later.';
  }
  return (
    <div className="error-page">
      <div className="error-box">
        <p className="error-box__heading">ERROR</p>
        <p>{message}</p>
        <Link className="error-box__link"to="/login">▹ Back to Login</Link>
      </div>
    </div>
  )
}

export default ErrorPage;