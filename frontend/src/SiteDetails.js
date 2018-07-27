import React, { Fragment } from 'react';
// import convert from 'xml-js';
import UUID from 'uuid';
import { connect } from 'react-redux';
import Adapter from './Adapter.js';
import { updateDetails } from './actions';

class SiteDetails extends React.Component {
  handleFavorite = () => {
    console.log(this.props);
    Adapter.getUser().then(user => {
      Adapter.addToFavorites(this.props.contractID, this.props.facilityID, this.props.facilityName, user)
      .then(json => alert(json.message))
    })

  }
  // constructor() {
  //   super();
  //
  //   this.state = {
  //     facility: '',
  //     lat: '',
  //     lng: '',
  //     description: '',
  //     streetAddress: '',
  //     city: '',
  //     state: '',
  //     zip: '',
  //     contact: [],
  //     amenities: [],
  //     imgs: [],
  //   }
  // }

  // makeRequest = (data) => {
  //   const options = {compact: true, ignoreComment: true, spaces: 4}
  //   const contractID = data[0]['contract_id'];
  //   const facilityID = data[0]['facility_id'];
  //   fetch(`https://cors-anywhere.herokuapp.com/https://www.reserveamerica.com/campgroundDetails.do?contractCode=${contractID}&parkId=${facilityID}&xml=true`)
  //   .then(r => r.text())
  //   .then(xml => convert.xml2json(xml, options))
  //   .then(jsonStr => {
  //     const obj = JSON.parse(jsonStr);
  //     console.log(obj['detailDescription'])
  //     this.setState({
  //       facility: obj['detailDescription']['_attributes']['facility'],
  //       lat: parseFloat(obj['detailDescription']['_attributes']['latitude']),
  //       lng: parseFloat(obj['detailDescription']['_attributes']['longitude']),
  //       description: obj['detailDescription']['_attributes']['description'],
  //       streetAddress: obj['detailDescription']['address']['_attributes']['streetAddress'],
  //       city: obj['detailDescription']['address']['_attributes']['city'],
  //       state: obj['detailDescription']['address']['_attributes']['state'],
  //       zip: obj['detailDescription']['address']['_attributes']['zip'],
  //       contact: obj['detailDescription']['contact'],
  //       amenities: obj['detailDescription']['amenity'],
  //       imgs: obj['detailDescription']['photo'],
  //     })
  //   })
  // }

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
