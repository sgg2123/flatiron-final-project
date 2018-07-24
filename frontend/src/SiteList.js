import React from 'react';
// import UUID from 'uuid';
import { connect } from 'react-redux';
import Adapter from './Adapter.js';
// import { updateSiteList } from './actions';

class SiteList extends React.Component {
  componentDidMount = () => {
    // Adapter.getCampgrounds(38.8947222, -105.1794444)
  }

  render() {
    return (
      <div className='site-list'>
        <h1>SITE LIST</h1>
        <ul>
          {this.props.siteList.map(site => {
            return (
              <li
                key={site['_attributes']['facilityID']}
                onClick={()=>console.log(site['_attributes']['facilityID'])}
              >{site['_attributes']['facilityName']}</li>
            )
          })}
        </ul>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    searchTerm: state.searchTerm,
    siteList: state.siteList,
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     updateSiteList: (searchTerm) => dispatch(updateSiteList(searchTerm)),
//   }
// }

export default connect(mapStateToProps, null)(SiteList);
