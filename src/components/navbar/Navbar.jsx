import { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom'; // Import Link for routing
import './navbar.css';

import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setToggleMenu(false);
    navigate('/');
  };

  const aiProducts = [
    { name: 'ChatGPT Clone', url: 'https://stately-cannoli-dccec3.netlify.app/' },
    { name: 'AI Summarizer', url: 'https://peaceful-brioche-9bddb1.netlify.app/' },
    { name: 'AI Image Generator' },
    { name: "image identifier" }
  ];

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          {/* <img src={logo} alt = "logo"/> */}
        </div>
        <div className="gpt3__navbar-links_container">
          <p><Link to="/">Home</Link></p>
          <p><Link to="/what-gpt3">What is GPT3?</Link></p>
          <p><Link to="/possibility">Open AI GPT-4</Link></p>
          <p><Link to="/features">Case Studies</Link></p>

          {/* Dropdown stays the same since it's external */}
          <div className="dropdown">
            <p><span>AI Products</span></p>
            <div className="dropdown-content">
              {aiProducts.map((product, index) => (
                product.url ? (
                  <a key={index} href={product.url} target="_blank" rel="noopener noreferrer">
                    {product.name}
                  </a>
                ) : (
                  <Link key={index} to="/not-found">
                    {product.name}
                  </Link>
                )
              ))}
            </div>
          </div>
          <p><Link to="/blog">Blog</Link></p>
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        {user ? (
          <div className="gpt3__navbar-user">
            <p>Hello, {user.user_name || 'User'}</p>
            <button type="button" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <>
            <p><Link to="/login">Sign in</Link></p>
            <button type="button">
              <Link to="/signup">Sign up</Link>
            </button>
          </>
        )}
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="gpt3__navbar-menu_container scale-up-center">
            <div className="gpt3__navbar-menu_container-links">
              <p><Link to="/">Home</Link></p>
              <p><Link to="/what-gpt3">What is GPT3?</Link></p>
              <p><Link to="/possibility">Open AI GPT-4</Link></p>
              <p><Link to="/features">Case Studies</Link></p>
              <p><span>AI Products</span></p>
              <p><Link to="/blog">Blog</Link></p>
            </div>

            <div className="gpt3__navbar-menu_container-links-sign">
              {user ? (
                <>
                  <p>Hello, {user.user_name}</p>
                  <button type="button" onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <p><Link to="/login">Sign in</Link></p>
                  <button type="button">
                    <Link to="/signup">Sign up</Link>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
