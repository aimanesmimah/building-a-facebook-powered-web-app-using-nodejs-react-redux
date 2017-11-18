import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {HashRouter,Route,Switch} from 'react-router-dom';
import SignIn from './components/authentication/signinForm';
import SignUp from './components/authentication/signupForm';
import UserDashboard from './components/dashboard/userDashboard';
import UserAccount from './components/dashboard/userAccount';
import Whoops404 from './components/whoops404';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  getChildContext() {
    return {
      store : this.props.store
    }
  }

  componentWillMount(){
    const {store} = this.props;
    this.unsubscribe = store.subscribe(()=> {
          console.log(JSON.stringify(store.getState()));
          this.forceUpdate();
        });
  }

  componentWillUnmount() {
     this.unsubscribe();
  }

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

App.propTypes = {
  store : PropTypes.object.isRequired
}

App.childContextTypes = {
  store : PropTypes.object.isRequired
}

export default App;
