import React from 'react';
import LoginButton from './../LoginButton.jsx';
import LogoutButton from './../LogoutButton.jsx';
import { useAuth0 } from '@auth0/auth0-react';

const NavigationHeader = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#informacion">Información</a>
            </li>
          </ul>
            <div className="login-button ms-auto">
              {!isAuthenticated ? (
                <LoginButton />
              ) : (
                <LogoutButton />
              )}
            </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationHeader;