import React from 'react';
import * as eeGeo from 'eegeo.js';
import L from 'leaflet'
import { connect } from 'react-redux';
import { changeLocation } from './actions.js';
import { toggle3D } from './actions.js';
import { takeTour } from './actions.js';
// import { endTour } from './actions.js';
import { Button } from 'semantic-ui-react';


class SiteMap extends React.Component {

  componentDidMount = () => {
    const map = L.map('map', {
     center: [this.props.lat, this.props.lng],
     zoom: 15
    });
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var marker = L.marker([this.props.lat, this.props.lng]).addTo(map);
  }

  componentWillReceiveProps = (nextprops) => {
    const mapContainer = document.getElementById('map-container')
    mapContainer.innerHTML = '<div id="map"></div>'
    if (nextprops.toggled3D === true) {
      if (nextprops.touring3D === true) {
        const map = eeGeo.map('map', 'c3d75ab06945250a4c588425ce33a8f2', {
         center: [this.props.lat, this.props.lng],
         zoom: 15,
       });
       var marker = eeGeo.marker([this.props.lat, this.props.lng], { title: "My marker" }).addTo(map);
       const lat = this.props.lat
       const lng = this.props.lng
       map.setView([lat, lng], 13, {headingDegrees:720, animated:true, durationSeconds:12});
       // setTimeout(this.props.endTour, 10000)
       // setTimeout(function() { map.setView([lat, lng], 13, {headingDegrees:270, animated:true, durationSeconds:5}); }, 4000);
      } else {
        const map = eeGeo.map('map', 'c3d75ab06945250a4c588425ce33a8f2', {
         center: [nextprops.lat, nextprops.lng],
         zoom: 15,
       });
       var marker = eeGeo.marker([nextprops.lat, nextprops.lng], { title: "My marker" }).addTo(map);
      }
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

  tour3D = () => {
    this.props.toggle3D()
    this.props.takeTour()
    console.log(this.props.touring3D)
  }

// <button id='change-location-button' onClick={this.props.changeLocation}>Change Location</button>

  render() {
    console.log(this.props)
    return (
      <div>
        <div id="map-container">
          <div id="map"></div>
        </div>
        <Button id='3D-tour' onClick={this.tour3D}>3D Tour</Button>
        <Button id='toggle-button' onClick={() => this.props.toggle3D(this.props.toggled3D)}>2D Map</Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lat: state.lat,
    lng: state.lng,
    toggled3D: state.toggled3D,
    touring3D: state.touring3D,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeLocation: () => dispatch(changeLocation()),
    toggle3D: (bool) => dispatch(toggle3D(bool)),
    takeTour: () => dispatch(takeTour()),
    // endTour: () => dispatch(endTour()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteMap);
