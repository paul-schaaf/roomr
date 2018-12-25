import React from 'react';
import './LogoutButton.css';

const LogoutButton = () => {
  return (
    <div className="logout-button">
      <a href="/api/logout">logout</a>
    </div>
  )
}

export default LogoutButton;