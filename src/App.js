import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { Header, Blog, Features, Possibility, WhatGPT3, Footer } from './containers/index';
import { CTA, Brand, Navbar } from './components/index';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';

function HomePage() {
  return (
    <>
      <Header />
      <Brand />
      <WhatGPT3 />
      <Features />
      <Possibility />
      <CTA />
      <Blog />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <div className='gradient__bg'>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/possibility" element={<Possibility />} />
          <Route path="/what-gpt3" element={<WhatGPT3 />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
