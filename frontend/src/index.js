import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import App from './App'
import Header from './components/Header'

const GlobalStyle = createGlobalStyle`
    div {
        font-family: 'Lato';
        font-size: 16px;
    }
`

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Router>
      <GlobalStyle />
      <Header />
      <App />
    </Router>
  </React.StrictMode>
)
