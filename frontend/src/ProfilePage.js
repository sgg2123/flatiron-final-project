import React from 'react';
import Adapter from './Adapter'
import UUID from 'uuid'
import SearchBar from './SearchBar.js'

class ProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: {},
      // interests: [],
      names: [],
    }
  }

  componentDidMount = () => {
    Adapter.getUser()
    .then(user => {
      this.setState({ currentUser: user })
      Adapter.getInterests(user.id)
      .then(interests => {
        // this.setState({ interests })
        const names = interests.map(interest => interest['facility_name'])
        this.setState({ names })

        // let names = []
        // interests.forEach(interest => {
        //   const campgroundID = interest['campground_id']
        //   Adapter.getCampgroundNameFromCampgroundID(campgroundID) //park 1
        //   .then(name => {
        //     names.push(name)
        //     this.setState({ names })
        //   })
        // })
      })
    })
  }

  handleClick = () => {
    console.log('clicked')
  }

  render() {
    return (
      <div className='profile-page'>
        <h1>{this.state.currentUser['first_name']} {this.state.currentUser['last_name']}</h1>
        <p>Username: {this.state.currentUser['username']}</p>
        <p>Your Interests:</p>
        {(this.state.names.length > 0) ?
          this.state.names.map(name => <li key={UUID()} onClick={this.handleClick}>{name}</li>)
          :
          <SearchBar />
        }
        <button>Edit Profile</button>
      </div>
    )
  }
}

export default ProfilePage;
