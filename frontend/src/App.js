import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import './App.css';
import SimpleExample from './SimpleExample.js';
import SiteDetails from './SiteDetails.js'
import SearchBar from './SearchBar.js'
import SiteList from './SiteList.js'
import Welcome from './Welcome.js'
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Adapter from './Adapter'

// <Redirect to="/" />
class App extends Component {
  render() {
    return (
      <div className="App">
          <Route exact path="/" component={NavBar} />


          { Adapter.isLoggedIn() ?
              <Fragment>
                <Route exact path="/" component={Welcome} />
                <SimpleExample />
                <SiteDetails />
                <SearchBar />
                <SiteList />
              </Fragment>
            :
              <Fragment>
                <Route exact path="/register" component={(props) => <RegistrationForm {...props} />} />
                <Route exact path="/login" component={(props) => <LoginForm {...props} />} />
              </Fragment>
          }
        </div>

    );
  }
}

export default App;
