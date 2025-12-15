import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './cta.css';

const CTA = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="gpt3__cta">
      <div className="gpt3__cta-content">
        <p>{user ? "Ready to dive deeper?" : "Request Early Access to Get Started"}</p>
        <h3>{user ? "Explore the AI Library and manage your profile." : "Register Today & start exploring the endless possibilities."}</h3>
      </div>
      <div className="gpt3__cta-btn">
        <button type="button" onClick={() => navigate(user ? '/dashboard' : '/signup')}>
          {user ? "Go to Dashboard" : "Get Started"}
        </button>
      </div>
    </div>
  );
};

export default CTA;
