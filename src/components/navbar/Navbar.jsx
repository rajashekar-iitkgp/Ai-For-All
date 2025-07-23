import { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { Link } from 'react-router-dom'; // Import Link for routing
import './navbar.css';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const aiProducts = [
    { name: 'ChatGPT Clone', url: 'https://stately-cannoli-dccec3.netlify.app/' },
    { name: 'AI Summarizer', url: 'https://your-ai-summarizer.netlify.app' }
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
                <a key={index} href={product.url} target="_blank" rel="noopener noreferrer">
                  {product.name}
                </a>
              ))}
            </div>
          </div>
          <p><Link to="/blog">Blog</Link></p>
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        {/* Use Link for routing */}
        <p><Link to="/login">Sign in</Link></p>
        <button type="button">
          <Link to="/signup">Sign up</Link>
        </button>
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
              {/* Updated for routing */}
              <p><Link to="/login">Sign in</Link></p>
              <button type="button">
                <Link to="/signup">Sign up</Link>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
