import React, { Component } from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';
import SignIn from './components/authentication/signinForm';
import SignUp from './components/authentication/signupForm';
import UserDashboard from './components/dashboard/userDashboard';
import UserAccount from './components/dashboard/userAccount';
import Whoops404 from './components/whoops404';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route exact path="/signIn" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/dashboard/index" component={UserDashboard} />
            <Route path="/dashboard/account" component={UserAccount} />
            <Route component={Whoops404} />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
