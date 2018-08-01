import React, { Fragment } from 'react';
// import convert from 'xml-js';
import UUID from 'uuid';
import { connect } from 'react-redux';
import Adapter from './Adapter.js';
import { updateDetails } from './actions';
import SiteMap from './SiteMap';

class SiteDetails extends React.Component {
  handleFavorite = () => {
    console.log(this.props);
    Adapter.getUser().then(user => {
      Adapter.addToFavorites(this.props.contractID, this.props.facilityID, this.props.facilityName, user, this.props.city, this.props.state)
      .then(json => alert(json.message))
    })
  }

  render() {
    return (
      <div>
        <h1> {this.props.facility} </h1>
        <p><strong>Description: </strong></p>
        <p>{this.props.description}</p>

        {this.props.imgs.length ?
          this.props.imgs.map(img => <img key={UUID()} src={`https://www.reserveamerica.com/${img['_attributes']['realUrl']}`}></img>)
          :
          null
        }

        <p><strong>Address: </strong></p>
        <p>{this.props.streetAddress}</p>
        <p>{this.props.city}</p>
        <p>{this.props.state}</p>
        <p>{this.props.zip}</p>

        {this.props.contact.length ?
          (
          <Fragment>
            <p><strong>Contact: </strong></p>
            <ul>{this.props.contact.map(contact => <li key={UUID()}>{contact['_attributes']['name']}: {contact['_attributes']['number']}</li>)}</ul>
          </Fragment>
          )
          :
          null
        }

        {this.props.amenities.length ?
          (
          <Fragment>
            <p><strong>Amenities: </strong></p>
            <ul>{this.props.amenities.map(amenity => <li key={UUID()}>{amenity['_attributes']['name']}</li>)}</ul>
          </Fragment>
          )
          :
          null
        }
        <SiteMap />
        <button onClick={this.handleFavorite}>💚</button>
      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    facility: state.facility,
    lat: state.lat,
    lng: state.lng,
    description: state.description,
    streetAddress: state.streetAddress,
    city: state.city,
    state: state.state,
    zip: state.zip,
    contact: state.contact,
    amenities: state.amenities,
    imgs: state.imgs,
    contractID: state.contractID,
    facilityID: state.facilityID,
    facilityName: state.facilityName,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateDetails: (details) => dispatch(updateDetails(details)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteDetails);
