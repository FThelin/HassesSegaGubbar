import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar'
import {theme} from './theme.js'
import { ThemeProvider } from '@material-ui/core';
import Main from './components/main/main'
import Login from './components/login/login'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from './context/userContext'

function App() { 

  return (
    <div className="app">
        <ThemeProvider theme={theme}>
      <UserProvider>
          <Login />
          <Router>
            <Main />        
            <Navbar />
          </Router>
      </UserProvider>
        </ThemeProvider>
    </div>
  );
}

export default App;
