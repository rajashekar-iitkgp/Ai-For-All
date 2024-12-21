import React from 'react';
import './signup.css';

const Signup = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-header">Sign Up</h1>
        <form className="auth-form">
          <input type="text" placeholder="Full Name" required className="auth-input" />
          <input type="email" placeholder="Email" required className="auth-input" />
          <input type="password" placeholder="Password" required className="auth-input" />
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <div className="auth-social-buttons">
          <button className="auth-social-button google-button">
            <i className="fab fa-google"></i> Sign up with Google
          </button>
          <button className="auth-social-button facebook-button">
            <i className="fab fa-facebook"></i> Sign up with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
