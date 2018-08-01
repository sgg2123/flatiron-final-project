import React from 'react';
import * as eeGeo from 'eegeo.js';
import L from 'leaflet'
import { connect } from 'react-redux';
import { changeLocation } from './actions.js';
import { toggle3D } from './actions.js';


class SiteMap extends React.Component {

  componentDidMount = () => {
    // const map = L.map('map', {
    //  center: [this.props.lat, this.props.lng],
    //  zoom: 15
    // });
    // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(map);
    // var marker = L.marker([this.props.lat, this.props.lng]).addTo(map);
  }

  componentWillReceiveProps = (nextprops) => {
    const mapContainer = document.getElementById('map-container')
    mapContainer.innerHTML = '<div id="map"></div>'
    if (nextprops.toggled3D === true) {
      const map = eeGeo.map('map', 'c3d75ab06945250a4c588425ce33a8f2', {
       center: [nextprops.lat, nextprops.lng],
       zoom: 15,
     });
     var marker = eeGeo.marker([nextprops.lat, nextprops.lng], { title: "My marker" }).addTo(map);
   } else {
     const map = L.map('map', {
       center: [nextprops.lat, nextprops.lng],
       zoom: 15
     });
     L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
     }).addTo(map);
     var marker = L.marker([nextprops.lat, nextprops.lng]).addTo(map);
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

export default connect(mapStateToProps, mapDispatchToProps)(SiteMap);
