import React from 'react';
import Adapter from './Adapter'
import UUID from 'uuid'
import SearchBar from './SearchBar.js'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { updateDetails } from './actions';
import { updateSelectedSite } from './actions';


class ProfilePage extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: {},
      interests: [],
    }
  }

  componentDidMount = () => {
    Adapter.getUser()
    .then(user => {
      this.setState({ currentUser: user })
      Adapter.getInterests(user.id)
      .then(interests => {
        this.setState({ interests })
      })
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
    console.log('edit user')
    this.props.history.push('/profile/edit');
  }

  render() {
    return (
      <div className='profile-page'>
        <h1>{this.state.currentUser['first_name']} {this.state.currentUser['last_name']}</h1>
        <p>Username: {this.state.currentUser['username']}</p>
        <p>Your Interests:</p>
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
          <SearchBar />
        }
          <button className='ui primary button' role='button' onClick={this.handleEditUser}>
            Edit Profile
          </button>
          <button className='ui secondary button' role='button' onClick={this.handleClick}>
            Delete Account
          </button>



      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    searchTerm: state.searchTerm,
    siteList: state.siteList,
    contractID: state.contractID,
    facilityID: state.facilityID,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDetails: (newState) => dispatch(updateDetails(newState)),
    updateSelectedSite: (contractID, facilityID, facilityName) => dispatch(updateSelectedSite(contractID, facilityID, facilityName)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));
