import React from 'react';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from "react-router-dom";

import Courses from './components/Courses';
import About from './components/About';
import Mycourse from './components/MyCourses';

import './App.css';

export const App = () => {
  let isLoggedIn = false;
  const storedUser = localStorage.getItem('abclearningAppUser') ? JSON.parse(localStorage.getItem('abclearningAppUser')) : {};
  isLoggedIn = storedUser && storedUser.loggedUser !== '';

  return (
    <div className="App">
      <Router>
        <header className="App-header">
          <div className="container headerContainer">
            <div className="logoContainer"><Link to="/"><img src={require("./assets/logo.png")} className="App-logo" alt="logo" /></Link></div>
            <div className="navContainer">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                {isLoggedIn ? 
                  <li><Link to="/my-course">My Courses</Link></li>
                  : 
                  <li>Login</li>
                }
              </ul>
            </div>
          </div>
        </header>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Courses}/>
            <Route path="/about" component={About} />
            <Route path="/my-course" component={Mycourse} />
          </Switch>
        </div>
      </Router>      
    </div>
  );
}

export default App;
