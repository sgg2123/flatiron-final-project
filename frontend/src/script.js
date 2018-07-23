debugger

import L from 'leaflet';

// let map = L.eeGeo.map('map', 'c3d75ab06945250a4c588425ce33a8f2', {
//   center: [40.744737, -75.738384],
//   zoom: 15
// });

var map = L.map('map', {
  center: [40.705489, -74.014081],
  zoom: 15
});
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
