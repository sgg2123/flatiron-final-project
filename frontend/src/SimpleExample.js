// import ReactLeaflet from 'react-leaflet';
import React from 'react';
// import { render } from 'react-dom';
// import { map, Marker, Popup, tileLayer } from 'react-leaflet'
// import ReactDOM from 'react-dom'
import * as eeGeo from 'wrld.js';
import L from 'leaflet'

import { connect } from 'react-redux';
// import { addUser } from './actions.js'
import { changeLocation } from './actions.js';
import { toggle3D } from './actions.js';

// import L from "wrld.js";
// or
// import L from "react-leaflet"
//
// let map = L.Wrld.map('map', 'c3d75ab06945250a4c588425ce33a8f2', {
//   center: [40.744737, -75.738384],
//   zoom: 15
// });

// const { Map: LeafletMap, TileLayer, Marker, Popup } = ReactLeaflet


// <div>
//   <Map center={position} zoom={this.state.zoom}>
//     <TileLayer
//       attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
//     />
//     <Marker position={position}>
//       <Popup>
//         A pretty CSS3 popup. <br/> Easily customizable.
//       </Popup>
//     </Marker>
//   </Map>
//   <button id='button' onClick={this.toggle3D}>Toggle 3D</button>
// </div>

class SimpleExample extends React.Component {

  componentDidMount = () => {
    const map = L.map('map', {
     center: [this.props.lat, this.props.lng],
     zoom: 15
    });
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  }

  componentWillReceiveProps = (nextprops) => {
    const mapContainer = document.getElementById('map-container')
    mapContainer.innerHTML = '<div id="map"></div>'
    if (nextprops.toggled3D === true) {
      eeGeo.map('map', 'c3d75ab06945250a4c588425ce33a8f2', {
       center: [nextprops.lat, nextprops.lng],
       zoom: 15
     });
   } else {
     const map = L.map('map', {
       center: [nextprops.lat, nextprops.lng],
       zoom: 15
     });
     L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
     }).addTo(map);
   }
  }

  render() {
    return (
      <div>
        <div id="map-container">
          <div id="map"></div>
        </div>
        <button id='toggle-button' onClick={() => this.props.toggle3D(this.props.toggled3D)}>Toggle 3D</button>
        <button id='change-location-button' onClick={this.props.changeLocation}>Change Location</button>
      </div>
    );
  }
}

// React only:
// export default SimpleExample;

function mapStateToProps(state) {
  return {
    lat: state.lat,
    lng: state.lng,
    toggled3D: state.toggled3D,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeLocation: () => dispatch(changeLocation()),
    toggle3D: (bool) => dispatch(toggle3D(bool))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleExample);
