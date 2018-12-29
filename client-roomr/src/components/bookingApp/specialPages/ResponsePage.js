import React from 'react';
import { Link } from 'react-router-dom';
import './ResponsePage.css';

/*
* This component renders an error page. More info in BookingApp.js
*/

const ResponsePage = ({ loginMessage, entityDeleted }) => {
  let message;
  if (entityDeleted) {
    message = 'Entity successfully deleted!'
  } else if (loginMessage) {
    message = loginMessage;
  } else {
    message = 'There is something wrong with your connection or the server. Please check your connection or try later.';
  }
  return (
    <div className="response-page">
      <div className="response-page-box">
        <p className="response-page-box__heading">{(entityDeleted) ? 'SUCCESS' : 'ERROR'}</p>
        <p>{message}</p>
        <Link className="response-page-box__link"to="/login">▹ Back to Login</Link>
      </div>
    </div>
  )
}

export default ResponsePage;