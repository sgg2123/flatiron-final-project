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
      <div>
        <h1>SITE LIST</h1>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    searchTerm: state.searchTerm
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     updateSiteList: (searchTerm) => dispatch(updateSiteList(searchTerm)),
//   }
// }

export default connect(mapStateToProps, null)(SiteList);
