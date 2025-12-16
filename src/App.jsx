import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { Header, Blog, BlogDetails, Features, Possibility, WhatGPT3, Footer } from './containers/index';
import { CTA, Brand, Navbar, NotFound, Profile, Chatbot, Dashboard } from './components/index';
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
        <Routes basename="/Ai-For-All">
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/possibility" element={<Possibility />} />
          <Route path="/what-gpt3" element={<WhatGPT3 />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
