import React from 'react';
// import UUID from 'uuid';
import { connect } from 'react-redux';
import Adapter from './Adapter.js';
import { updateDetails } from './actions';
import { updateSelectedSite } from './actions';

class SiteList extends React.Component {
  componentDidMount = () => {
    // Adapter.getCampgrounds(38.8947222, -105.1794444)
  }

  handleClick = (contractID, facilityID, facilityName) => {
    this.props.updateSelectedSite(contractID, facilityID, facilityName)
    Adapter.getDetails(contractID, facilityID).then((newState => this.props.updateDetails(newState)))
    this.props.history.push("/details")
  }

  render() {
    return (
      <div className='site-list'>
        <h1>SITE LIST</h1>
          <ul>
            {this.props.siteList.map(site => {
              const facilityID = site['_attributes']['facilityID']
              const contractID = site['_attributes']['contractID']
              const facilityName = site['_attributes']['facilityName']
              return (
                <li
                  key={`${facilityName}-${facilityID}`}
                  onClick={() => {
                    this.handleClick(contractID, facilityID, facilityName)
                  }}
                >{facilityName}
                </li>
              )}
            )}
          </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(SiteList);
