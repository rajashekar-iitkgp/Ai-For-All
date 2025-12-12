import React from 'react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { BsFacebook } from 'react-icons/bs';
import './auth.css';

import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [inputs, setInputs] = React.useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, password };
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const parseRes = await response.json();

      if (response.ok) {
        login(parseRes.token, parseRes.user);
        navigate('/');
      } else {
        alert(parseRes.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-header">Create Account</h1>
        <form className="auth-form" onSubmit={onSubmitForm}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="auth-input"
            value={name}
            onChange={onChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="auth-input"
            value={email}
            onChange={onChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={onChange}
            required
          />
          <button type="submit" className="auth-button">Sign Up</button>
        </form>

        <div className="auth-social-buttons">
          <button className="auth-social-button">
            <FcGoogle /> Google
          </button>
          <button className="auth-social-button">
            <BsFacebook color="#1877F2" /> Facebook
          </button>
        </div>

        <div className="auth-switch">
          Already have an account?
          <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
