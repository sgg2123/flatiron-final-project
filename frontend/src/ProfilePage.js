import React from 'react';
import Adapter from './Adapter'

class ProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: {}
    }
  }

  getUsername = () => {
    return localStorage.getItem('username')
  }

  setInterests = () => {
    const id = this.state.currentUser.id
    return Adapter.getInterests(id)
  }

  componentDidMount = () => {
    Adapter.getUsers()
    .then(users => {
      const currentUsername = this.getUsername()
      const foundUser = users.find(user => user.username === currentUsername)
      console.log(foundUser)
      this.setState({
        currentUser: foundUser
      })
    })
  }

  render() {
    return (
      <div>
        <h1>{this.getUsername()}</h1>
        <p>{this.state.currentUser['first_name']} {this.state.currentUser['last_name']}</p>
        <p>Your Interests:</p>
        <p>{this.setInterests()}</p>
      </div>
    )
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
export default ProfilePage;
