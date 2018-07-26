import convert from 'xml-js';

export default class Adapter {
  static getDetails(contractID, facilityID) {
    const options = {compact: true, ignoreComment: true, spaces: 4};
    return (
      fetch(`https://cors-anywhere.herokuapp.com/http://api.amp.active.com/camping/campground/details?contractCode=${contractID}&parkId=${facilityID}&api_key=hmn6tzctjc74t3268nr7t4uh`)
      .then(r => r.text())
      .then(xml => convert.xml2json(xml, options))
      .then(jsonStr => JSON.parse(jsonStr))
      .then(obj => {
        let newState = {
          facility: obj['detailDescription']['_attributes']['facility'],
          lat: parseFloat(obj['detailDescription']['_attributes']['latitude']),
          lng: parseFloat(obj['detailDescription']['_attributes']['longitude']),
          description: obj['detailDescription']['_attributes']['description'],
          streetAddress: obj['detailDescription']['address']['_attributes']['streetAddress'],
          city: obj['detailDescription']['address']['_attributes']['city'],
          state: obj['detailDescription']['address']['_attributes']['state'],
          zip: obj['detailDescription']['address']['_attributes']['zip'],
          contact: obj['detailDescription']['contact'],
          amenities: obj['detailDescription']['amenity'],
          imgs: obj['detailDescription']['photo'],
        }
        return newState;
      })
    )
  }

  static getCampgrounds(lat, lng) {
    const options = {compact: true, ignoreComment: true, spaces: 4};
    return (
      fetch(`https://cors-anywhere.herokuapp.com/http://api.amp.active.com/camping/campgrounds/?landmarkLat=${lat}&landmarkLong=${lng}&landmarkName=true&api_key=hmn6tzctjc74t3268nr7t4uh`)
      .then(r => r.text())
      .then(xml => convert.xml2json(xml, options))
      .then(jsonStr => JSON.parse(jsonStr))
      .then(data => data['resultset']['result'])
    )
  }

  static isLoggedIn() {
    return !!localStorage.getItem('token')
  }

  static logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

  static login(username, password) {
   return fetch(`http://localhost:3000/api/v1/sessions/`, {
     method: 'POST',
     headers: {
       "Content-Type": 'application/json'
     },
     body: JSON.stringify({ username, password })
   });
 }

 static getUser() {
   let token = localStorage.getItem('token')
   let config = {
   	method: 'GET',
       headers: {
   		"Authorization": token,
   		"Content-Type": 'application/json',
   	}
   }
   return fetch('http://localhost:3000/api/v1/users', config)
   .then(r => r.json())
   .then(users => {
     const currentUsername = localStorage.getItem('username')
     return users.find(user => user.username === currentUsername)
   })
 }

 static getInterests(id) {
   let token = localStorage.getItem('token')
   let config = {
   	method: 'GET',
      headers: {
   		"Authorization": token,
   		"Content-Type": 'application/json',
   	}
   }
   return fetch(`http://localhost:3000/api/v1/users/${id}/interests`, config)
   .then(r => r.json())
 }

 static addToFavorites(contractID, facilityID, user) {
   console.log(contractID, facilityID)
   console.log(user)
   let token = localStorage.getItem('token')
   let config = {
   	method: 'POST',
      headers: {
   		"Authorization": token,
   		"Content-Type": 'application/json',
   	}
   }
   // fetch('http://localhost:3000/api/v1/interests')
 }

 static getCampgroundNameFromCampgroundID(campgroundID) {
   let token = localStorage.getItem('token')
   let config = {
   	method: 'GET',
      headers: {
   		"Authorization": token,
   		"Content-Type": 'application/json',
   	}
   }
   return fetch(`http://localhost:3000/api/v1/campgrounds/${campgroundID}`, config)
   .then(r => r.json())
   .then(campground => {
     const contractID = campground['contract_id']
     const facilityID = campground['facility_id']
     return this.getDetails(contractID, facilityID)
     .then(detailsObj => detailsObj['facility'])
   })
 }

}
