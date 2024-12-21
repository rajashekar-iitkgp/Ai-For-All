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
          <p><a href="#home">Home</a></p>
          <p><a href="#wgpt3">What is GPT3?</a></p>
          <p><a href="#possibilities">Open AI GPT-4</a></p>
          <p><a href="#features">Case Studies</a></p>
          
          {/* Dropdown menu for AI Products */}
          <div className="dropdown">
            <p><a href="#library">AI Products</a></p>
            <div className="dropdown-content">
              {aiProducts.map((product, index) => (
                <a key={index} href={product.url} target="_blank" rel="noopener noreferrer">
                  {product.name}
                </a>
              ))}
            </div>
          </div>
          {/* End of dropdown */}

          <p><a href="#blog">Blog</a></p>
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
              <p><a href="#home">Home</a></p>
              <p><a href="#wgpt3">What is GPT3?</a></p>
              <p><a href="#possibility">Open AI</a></p>
              <p><a href="#features">Case Studies</a></p>
              <p><a href="#library">AI Products</a></p>
              <p><a href="#blog">AI Blog</a></p>
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
