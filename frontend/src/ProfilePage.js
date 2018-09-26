import React from 'react';
import Adapter from './Adapter'
import UUID from 'uuid'
import SearchBar from './SearchBar.js'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { updateDetails } from './actions';
// import { updateSelectedSite } from './actions';
import { setUser } from './actions';
let count = 0

class ProfilePage extends React.Component {
  // constructor() {
  //   super();
  //
  //   this.state = {
  //     interests: [],
  //   }
  // }

  // componentDidMount = () => {
  //   console.log('mount')
  //   console.log(this.props.currentUser)
  //   Adapter.getUser()
  //   .then(user => {
  //     console.log(user)
  //     this.props.setUser(user)
  //     Adapter.getInterests(user.id)
  //     .then(interests => {
  //       this.setState({ interests })
  //     })
  //   })
  // }

  // componentWillReceiveProps = () => {
  //   console.log('props')
  //
  //   if (count < 1) {
  //     Adapter.getUser()
  //     .then(user => {
  //       console.log(user)
  //       this.props.setUser(user)
  //       Adapter.getInterests(user.id)
  //       .then(interests => {
  //         this.setState({ interests })
  //       })
  //     })
  //     count += 1
  //   }
  // }

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

  render() {
    console.log(this.props.currentUser)
    console.log(this.props)
    const json = JSON.parse(localStorage.getItem('state'));
    const currentUser = json.currentUser;
    const interests = json.interests;
    return (
      <div className='profile-page'>
        <h1>{currentUser['first_name']} {currentUser['last_name']}</h1>
        <p>Username: {currentUser['username']}</p>
        <p>Your Interests:</p>
        {(interests.length > 0) ?
          interests.map(interest => {
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
    // searchTerm: state.searchTerm,
    // siteList: state.siteList,
    // contractID: state.contractID,
    // facilityID: state.facilityID,
    currentUser: state.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDetails: (newState) => dispatch(updateDetails(newState)),
    // updateSelectedSite: (contractID, facilityID, facilityName) => dispatch(updateSelectedSite(contractID, facilityID, facilityName)),
    setUser: (currentUser) => dispatch(setUser(currentUser)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfilePage));
