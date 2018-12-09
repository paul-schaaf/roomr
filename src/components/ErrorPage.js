import React from 'react';
import './ErrorPage.css';

const ErrorPage = props => {
  return (
    <div className="error-page">
      <div className="error-box">
        <p className="error-box__heading">ERROR</p>
        <p>There is something wrong with your connection or the server. Please check your connection or try later.</p>
      </div>
    </div>
  )
}

export default ErrorPage;