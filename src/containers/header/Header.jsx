import React from 'react';
import people from '../../assets/people.png';
import ai from '../../assets/ai.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './header.css';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="gpt3__header section__padding" id="home">
      <div className="gpt3__header-content">
        <h1 className="gradient__text">
          {user ? `Welcome Back, ${user.user_name}!` : "Let's Build Something amazing with GPT-3 OpenAI"}
        </h1>
        <p>Yet bed any for travelling assistance indulgence unpleasing. Not thoughts all exercise blessing. Indulgence way everything joy alteration boisterous the attachment. Party we years to order allow asked of.</p>

        <div className="gpt3__header-content__input">
          {user ? (
            <button type="button" onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
          ) : (
            <>
              <input type="email" placeholder="Your Email Address" />
              <button onClick={() => navigate('/signup')} type="button">Get Started</button>
            </>
          )}
        </div>

        <div className="gpt3__header-content__people">
          <img src={people} alt="people" />
          <p>1,600 people requested access a visit in last 24 hours</p>
        </div>
      </div>

      <div className="gpt3__header-image">
        <img src={ai} alt="ai" />
      </div>
    </div>
  );
};

export default Header;
