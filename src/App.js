import React from 'react'
import { render } from 'react-dom'

import Header from './components/Header'
import Router from './components/Router'

import './styles/roomList.css'

function App() {
  return (
    <div>
      <Header />
      <Router />
    </div>
  );
}

export default App;
