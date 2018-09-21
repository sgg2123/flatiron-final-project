import React from 'react';
import { connect } from 'react-redux';
import Adapter from './Adapter.js';
import { updateDetails } from './actions';
import { updateSelectedSite } from './actions';
import { withRouter } from 'react-router';
import { clearDetails } from './actions';
import L from 'leaflet'

class SiteList extends React.Component {
  componentDidMount = () => {
    console.log('mount')
    if (this.props.siteList.length !== 0) {
      console.log(this.props.siteList)
      const mapContainer = document.getElementById('map-container')
      mapContainer.innerHTML = '<div id="map"></div>'
      const map = L.map('map', {
        center: [this.props.siteList[0]['_attributes']['latitude'], this.props.siteList[0]['_attributes']['longitude']],
        zoom: 7,
      });
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      let count = 1
      this.props.siteList.map(site => {
        var marker = L.marker([site['_attributes']['latitude'], site['_attributes']['longitude']], {
          icon: L.divIcon({
            className: 'my-custom-icon',
            html: `${count}`
          })
        }).addTo(map);
        marker.bindPopup(`${site['_attributes']['facilityName']}`);
        count += 1
      })
    }
  }

  // componentWillReceiveProps = (nextprops) => {
  //   console.log('props')
  //   if (nextprops.siteList.length !== 0) {
  //     const mapContainer = document.getElementById('map-container')
  //     mapContainer.innerHTML = '<div id="map"></div>'
  //     const map = eeGeo.map('map', 'c3d75ab06945250a4c588425ce33a8f2', {
  //       center: [nextprops.siteList[0]['_attributes']['latitude'], nextprops.siteList[0]['_attributes']['longitude']],
  //       zoom: 5,
  //     });
  //     nextprops.siteList.map(site => {
  //       var marker = eeGeo.marker([site['_attributes']['latitude'], site['_attributes']['longitude']], { title: "My marker" }).addTo(map);
  //       marker.bindPopup(`${site['_attributes']['facilityName']}`);
  //     })
  //   }
  // }

  handleClick = (contractID, facilityID, facilityName) => {
    this.props.clearDetails()
    this.props.updateSelectedSite(contractID, facilityID, facilityName)
    Adapter.getDetails(contractID, facilityID)
    .then(newState => {
      this.props.updateDetails(newState)
      if (this.props.facility === '') {
        alert('Details not available at this time, sorry!')
        this.props.history.push('/results')
      } else {
        this.props.history.push("/details")
      }
    })
  }

  render() {
    return (
      <div className='site-list'>
        <div id="map-container">
          <div id="map"></div>
        </div>
        <ol>
          {this.props.siteList.map(site => {
            const facilityID = site['_attributes']['facilityID']
            const contractID = site['_attributes']['contractID']
            const facilityName = site['_attributes']['facilityName']
            return (
              <li
                key={`${facilityName}-${facilityID}`}
                onClick={() => {
                  this.handleClick(contractID, facilityID, facilityName)
                }}
              >{facilityName}
              </li>
            )}
          )}
        </ol>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    facility: state.facility,
    searchTerm: state.searchTerm,
    siteList: state.siteList,
    contractID: state.contractID,
    facilityID: state.facilityID,
  }
}


function mapDispatchToProps(dispatch) {
  return {
    updateDetails: (newState) => dispatch(updateDetails(newState)),
    updateSelectedSite: (contractID, facilityID, facilityName) => dispatch(updateSelectedSite(contractID, facilityID, facilityName)),
    clearDetails: () => dispatch(clearDetails()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SiteList));
