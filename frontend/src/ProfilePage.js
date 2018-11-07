import React from 'react';
import Adapter from './Adapter'
import UUID from 'uuid'
import SearchBar from './SearchBar.js'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { updateDetails } from './actions';
// import { updateSelectedSite } from './actions';

class ProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {
      interests: [],
    }
  }

  componentDidMount = () => {
    Adapter.getInterests(this.props.currentUser.id)
    .then(interests => {
      this.setState({ interests })
    })
  }

  handleClick = (interestID, contractID, facilityID) => {
    Adapter.getCampgroundFromInterest(interestID)
    .then(json => {
      const contractID = json['contract_id']
      const facilityID = json['facility_id']
      Adapter.getDetails(contractID, facilityID).then((newState => this.props.updateDetails(newState)))
      .then(this.props.history.push('/details'))
    })
  }

  handleEditUser = () => {
    this.props.history.push('/profile/edit');
  }

  handleDeleteAccount = () => {
    this.props.history.push('/profile/delete');
  }

  goHome = () => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className='profile-page'>

        <h1>{this.props.currentUser['first_name']} {this.props.currentUser['last_name']}</h1>

        <p>Username: {this.props.currentUser['username']}</p>

        {(this.state.interests.length > 0) ?
          <p>Your Interests:</p>
          :
          <div>
            <button className='ui button' role='button' onClick={this.goHome}>No favorites yet, search here!</button>
          </div>
        }

        {(this.state.interests.length > 0) ?
          this.state.interests.map(interest => {
            const interestID = interest.id
            return (
              <div key={UUID()} onClick={()=>this.handleClick(interestID)} role='list' className='ui list'>
                <div role='listitem' className='item'>
                  <img src='https://cdn.shopify.com/s/files/1/1250/6093/products/IRON_HORSE_TENT-14-X4.jpg?v=1512597504' className='ui avatar image' />
                  <div className='content'>
                    <a className='header'>{interest['facility_name']}</a>
                    <div className='description'>
                      {`${interest['city']}, ${interest['state']}`}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
          :
          null
        }

        <button className='ui primary button' role='button' onClick={this.handleEditUser}>
          Edit Profile
        </button>
        
        <button className='ui secondary button' role='button' onClick={this.handleDeleteAccount}>
          Delete Account
        </button>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDetails: (newState) => dispatch(updateDetails(newState)),
    // updateSelectedSite: (contractID, facilityID, facilityName) => dispatch(updateSelectedSite(contractID, facilityID, facilityName)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));
