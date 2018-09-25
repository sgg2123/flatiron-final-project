import React, { Fragment } from 'react';
// import convert from 'xml-js';
import UUID from 'uuid';
import { connect } from 'react-redux';
import Adapter from './Adapter.js';
import { updateDetails } from './actions';
import SiteMap from './SiteMap';
import { clearDetails } from './actions';
import { Button } from 'semantic-ui-react';

class SiteDetails extends React.Component {
  handleFavorite = () => {
    console.log(this.props);
    const json = JSON.parse(localStorage.getItem('state'));
    Adapter.getUser().then(user => {
      Adapter.addToFavorites(json.contractID, json.facilityID, json.facilityName, user, json.city, json.state)
      .then(json => alert(json.message))
    })
  }

  render() {
    const json = JSON.parse(localStorage.getItem('state'));

    return (
      <div className='site-details'>
        <h1> {json.facility} </h1>
        {
          json.description ?
          (
          <Fragment>
            <p><strong>Description: </strong></p>
            <p>{json.description}</p>
          </Fragment>
          )
          :
          null
        }

        {(json.imgs.length > 0) ?
          json.imgs.map(img => <img key={UUID()} src={`https://www.reserveamerica.com/${img['_attributes']['realUrl']}`}></img>)
          :
          null
        }

        {
          json.streetAddress ?
          (
          <Fragment>
            <p><strong>Address: </strong></p>
            <p>{json.streetAddress}</p>
          </Fragment>
          )
          :
          null
        }

        <p>{json.city}</p>
        <p>{json.state}</p>
        <p>{json.zip}</p>

        {(json.contact.length > 0) ?
          (
          <Fragment>
            <p><strong>Contact: </strong></p>
            <ul>{json.contact.map(contact => {
                console.log(contact['_attributes']['number'])
                let number;
                if (contact['_attributes']['number'].trim() === "") {
                  number = "N/A"
                } else {
                  number = contact['_attributes']['number']
                }
                return <li key={UUID()}>{contact['_attributes']['name']}: {number}</li>
            })}</ul>
          </Fragment>
          )
          :
          null
        }

        {(json.amenities.length > 0) ?
          (
          <Fragment>
            <p><strong>Amenities: </strong></p>
            <ul>{json.amenities.map(amenity => <li key={UUID()}>{amenity['_attributes']['name']}</li>)}</ul>
          </Fragment>
          )
          :
          null
        }

        {
          json.facility ?
          (
            <Fragment>
              <SiteMap />
              <Button onClick={this.handleFavorite}>💚</Button>
            </Fragment>
          )
          :
          null
        }

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
    clearDetails: () => dispatch(clearDetails()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteDetails);
