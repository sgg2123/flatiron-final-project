import React from 'react';
import * as eeGeo from 'eegeo.js';
import L from 'leaflet'
import { connect } from 'react-redux';
import { toggle3D, takeTour } from './actions';
// import { endTour } from './actions.js';
import { Button } from 'semantic-ui-react';


class SiteMap extends React.Component {

  componentDidMount = () => {
    const json = JSON.parse(localStorage.getItem('state'));
    console.log(json)
    const map = L.map('map', {
     center: [json.lat, json.lng],
     zoom: 15
    });
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var marker = L.marker([json.lat, json.lng]).addTo(map);
  }

  componentWillReceiveProps = (nextprops) => {
    const json = JSON.parse(localStorage.getItem('state'));
    const mapContainer = document.getElementById('map-container')
    mapContainer.innerHTML = '<div id="map"></div>'
    if (nextprops.toggled3D === true) {
      if (nextprops.touring3D === true) {
        const map = eeGeo.map('map', 'c3d75ab06945250a4c588425ce33a8f2', {
         center: [json.lat, json.lng],
         zoom: 15,
       });
       var marker = eeGeo.marker([json.lat, json.lng], { title: "My marker" }).addTo(map);
       const lat = json.lat
       const lng = json.lng
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
    toggle3D: (bool) => dispatch(toggle3D(bool)),
    takeTour: () => dispatch(takeTour()),
    // endTour: () => dispatch(endTour()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteMap);
