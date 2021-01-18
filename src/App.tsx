import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'

import Greetings from './components/Greetings'
import Router from './components/Router'
import Header from './components/Header'

//import './pages/roomlist/roomList.css'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  return (
    <div>
      <Header />
      <Router />
    </div>
  )
}

render(<App />, mainElement)