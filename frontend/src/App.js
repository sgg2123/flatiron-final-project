import React, { Component } from 'react';
import Adapter from './Adapter';
import { Route } from 'react-router-dom';
import NavBar from './NavBar';
import Welcome from './Welcome';
import SearchBar from './SearchBar';
import SiteList from './SiteList';
import SiteDetails from './SiteDetails';
import ProfilePage from './ProfilePage';
import EditProfilePage from './EditProfilePage';
import DeleteProfilePage from './DeleteProfilePage';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        { Adapter.isLoggedIn() ?
          <div className='logged-in'>
            <Route path="/" component={NavBar} />
            <Route exact path="/" component={Welcome} />
            <Route exact path="/" component={(props) => <SearchBar {...props} />} />
            <Route exact path="/results" component={SiteList} />
            <Route exact path="/details" component={SiteDetails} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/profile/edit" component={EditProfilePage} />
            <Route exact path="/profile/delete" component={DeleteProfilePage} />
          </div>
          :
          <div className='login-page'>
            <Route path="/" component={NavBar} />
            <Route exact path="/register" component={(props) => <RegistrationForm {...props} />} />
            <Route exact path="/login" component={(props) => <LoginForm {...props} />} />
          </div>
        }
      </div>
    );
  }
}

export default App;
