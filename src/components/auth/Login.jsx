import React from 'react';
import './login.css';

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-header">Log In</h1>
        <form className="auth-form">
          <input type="email" placeholder="Email" required className="auth-input" />
          <input type="password" placeholder="Password" required className="auth-input" />
          <button type="submit" className="auth-button">Log In</button>
        </form>
        <div className="auth-social-buttons">
          <button className="auth-social-button google-button">
            <i className="fab fa-google"></i> Log in with Google
          </button>
          <button className="auth-social-button facebook-button">
            <i className="fab fa-facebook"></i> Log in with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
