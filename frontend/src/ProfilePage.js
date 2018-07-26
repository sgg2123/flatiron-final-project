import React from 'react';
import Adapter from './Adapter'
import UUID from 'uuid'

class ProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: {},
      interests: [],
      names: [],
    }
  }

  componentDidMount = () => {
    Adapter.getUser()
    .then(user => {
      this.setState({ currentUser: user })
      Adapter.getInterests(user.id)
      .then(interests => {
        this.setState({ interests })
        let names = []
        interests.forEach(interest => {
          const campgroundID = interest['campground_id']
          Adapter.getCampgroundNameFromCampgroundID(campgroundID) //park 1
          .then(name => {
            names.push(name)
            this.setState({ names })
          })
        })
      })
    })
  }

  render() {
    return (
      <div>
        <h1>{this.state.currentUser['username']}</h1>
        <p>{this.state.currentUser['first_name']} {this.state.currentUser['last_name']}</p>
        <p>Your Interests:</p>
        <ul>
          {(this.state.names.length > 0) ?
            this.state.names.map(name => <li key={UUID()}>{name}</li>)
            :
            null
          }
        </ul>
      </div>
    )
  }
}

export default ProfilePage;
