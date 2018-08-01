import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import './App.css';
import SiteDetails from './SiteDetails.js'
import SearchBar from './SearchBar.js'
import SiteList from './SiteList.js'
import Welcome from './Welcome.js'
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Adapter from './Adapter'
import Logo from './Logo.js'
import ProfilePage from './ProfilePage'

// <Redirect to="/" />
class App extends Component {
  render() {
    return (
      <div className="App">
          { Adapter.isLoggedIn() ?
              <Fragment>
                <Route path="/" component={(props) => <Logo {...props} />} />
                <Route path="/" component={NavBar} />
                <Route exact path="/" component={Welcome} />
                <Route exact path="/" component={(props) => <SearchBar {...props} />} />
                <Route exact path="/results" component={SiteList} />
                <Route exact path="/details" component={SiteDetails} />
                <Route exact path="/profile" component={ProfilePage} />
              </Fragment>
            :
              <Fragment>
                <div className='login-page'>
                  <Route path="/" component={(props) => <Logo {...props} />} />
                  <Route exact path="/" component={NavBar} />
                  <Route exact path="/register" component={(props) => <RegistrationForm {...props} />} />
                  <Route exact path="/login" component={(props) => <LoginForm {...props} />} />
                </div>
              </Fragment>
          }
        </div>

    );
  }
}

export default App;
