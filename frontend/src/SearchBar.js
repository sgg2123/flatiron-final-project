import React from 'react';
import { connect } from 'react-redux';
import Adapter from './Adapter.js';
import { handleSearchChange } from './actions';
import { updateSiteList } from './actions';
import { submitForm } from './actions';
import SiteList from './SiteList.js'

class SearchBar extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.searchTerm}&key=AIzaSyBj13X3O6va1yUvE4S9u4bflAq-FqCTzcY`)
    .then(r => r.json())
    .then(data => {
      const lat = data['results'][0]['geometry']['location']['lat']
      const lng = data['results'][0]['geometry']['location']['lng']
      Adapter.getCampgrounds(lat, lng)
      .then(array => {
        this.props.updateSiteList(array)
        this.props.submitForm()
        this.props.history.push("/results")
      })
    })
  }

  render() {
    return (
      <div id='search-bar'>

        <form className='form-input' onSubmit={this.handleSubmit}>
          <input
            type='text'
            value={this.props.searchTerm}
            onChange={this.props.handleSearchChange}
            placeholder="Enter a location by city, state, or zip"
          />
        <input
            type='submit'
            value='Find campgrounds!'
          />
        </form>

        { this.props.formSubmitted ?
          <SiteList />
        :
          null
        }

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    searchTerm: state.searchTerm,
    siteList: state.siteList,
    formSubmitted: state.formSubmitted,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSearchChange: (event) => dispatch(handleSearchChange(event)),
    updateSiteList: (array) => dispatch(updateSiteList(array)),
    submitForm: () => dispatch(submitForm()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
