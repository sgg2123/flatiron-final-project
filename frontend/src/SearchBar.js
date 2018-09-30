import React from 'react';
import { connect } from 'react-redux';
import Adapter from './Adapter.js';
import { handleSearchChange } from './actions';
import { updateSiteList } from './actions';
import { submitForm } from './actions';
import SiteList from './SiteList.js'
import { clearSearchTerm } from './actions';

class SearchBar extends React.Component {
  handleInputChange = (event) => {
    // const target = event.target;
    // const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;
    //
    // this.setState({
    //   [name]: value
    // }, () => console.log(this.state));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const json = JSON.parse(localStorage.getItem('state'));
    if (json.searchTerm.trim() === '') {
      alert('Please enter an address, city, state, or zip to start your search!')
    } else {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.props.searchTerm}&key=AIzaSyBj13X3O6va1yUvE4S9u4bflAq-FqCTzcY`)
      .then(r => r.json())
      .then(data => {
        const lat = data['results'][0]['geometry']['location']['lat']
        const lng = data['results'][0]['geometry']['location']['lng']
        const filters = {
          sewer: this.props.sewer,
          water: this.props.water,
          pull: this.props.pull,
          pets: this.props.pets,
          waterfront: this.props.waterfront,
        }
        Adapter.getCampgrounds(lat, lng, filters)
        .then(array => {
          this.props.updateSiteList(array)
          this.props.submitForm()
          this.props.clearSearchTerm()
          this.props.history.push("/results")
        })
      })
    }

  }

  render() {
    return (
      <div id='search-bar'>

        <form className='form-input' onSubmit={this.handleSubmit}>
          <input
            name='searchTerm'
            type='text'
            value={this.props.searchTerm}
            onChange={this.props.handleSearchChange}
            placeholder="Enter a location by address, city, state, or zip"
          />
          <input
            type='submit'
            value='Find campgrounds!'
          />

          <label>
            Sewer Hookup:
            <input
              name="sewer"
              type="checkbox"
              checked={this.props.sewer}
              onChange={this.props.handleSearchChange} />
          </label>
          <label>
            Water Hookup:
            <input
              name="water"
              type="checkbox"
              checked={this.props.water}
              onChange={this.props.handleSearchChange} />
          </label>
          <label>
            Pull Through Driveway:
            <input
              name="pull"
              type="checkbox"
              checked={this.props.pull}
              onChange={this.props.handleSearchChange} />
          </label>
          <label>
            Pets Allowed:
            <input
              name="pets"
              type="checkbox"
              checked={this.props.pets}
              onChange={this.props.handleSearchChange} />
          </label>
          <label>
            Waterfront Sites:
            <input
              name="waterfront"
              type="checkbox"
              checked={this.props.waterfront}
              onChange={this.props.handleSearchChange} />
          </label>
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
    sewer: state.sewer,
    water: state.water,
    pull: state.pull,
    pets: state.pets,
    waterfront: state.waterfront,
    siteList: state.siteList,
    formSubmitted: state.formSubmitted,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleSearchChange: (event) => dispatch(handleSearchChange(event)),
    updateSiteList: (array) => dispatch(updateSiteList(array)),
    submitForm: () => dispatch(submitForm()),
    clearSearchTerm: () => dispatch(clearSearchTerm()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
