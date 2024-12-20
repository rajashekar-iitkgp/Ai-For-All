// import React from 'react';

import './App.css';

import { Header, Blog, Features, Possibility, WhatGPT3, Footer} from './containers/index';
import { CTA, Brand, Navbar} from './components/index';


function App() {
  return (
    <div className="App">
      <div className='gradient__bg'>
        <Navbar /> 
        {/* <Library /> */}
        <Header />
        
      </div>
      <Brand />
      <WhatGPT3 />
      <Features />
      <Possibility />
      <CTA />
      <Blog />
      <Footer />
    </div>
  );
}

export default App;
