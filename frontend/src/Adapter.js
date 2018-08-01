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

  static getCampgrounds(lat, lng, filters) {
    console.log(filters)
    const options = {compact: true, ignoreComment: true, spaces: 4};
    let URL = `https://cors-anywhere.herokuapp.com/http://api.amp.active.com/camping/campgrounds/?landmarkLat=${lat}&landmarkLong=${lng}&landmarkName=true&api_key=hmn6tzctjc74t3268nr7t4uh`
    if (filters.sewer) {
      URL+='&sewer=3007'
    }
    if (filters.water) {
      URL+='&water=3006'
    }
    if (filters.pull) {
      URL+='&pull=3008'
    }
    if (filters.pets) {
      URL+='&pets=3010'
    }
    if (filters.waterfront) {
      URL+='&waterfront=3011'
    }
    return (
      fetch(URL)
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

 static addToFavorites(contract_id, facility_id, facility_name, user, city, state) {
   console.log(contract_id, facility_id, facility_name, city, state)
   console.log(user)

   let user_id = user.id

   let token = localStorage.getItem('token')

   let config = {
   	method: 'POST',
    headers: {
   		"Authorization": token,
   		"Content-Type": 'application/json',
   	},
    body: JSON.stringify({ contract_id, facility_id, facility_name, city, state })
   }
   return fetch(`http://localhost:3000/api/v1/campgrounds`, config)
   .then(r => r.json())
   .then(json => {
     const campground_id= json['campground_id']

     let config = {
     	method: 'POST',
      headers: {
     		"Authorization": token,
     		"Content-Type": 'application/json',
     	},
      body: JSON.stringify({ user_id , campground_id, facility_name, city, state })
     }
     return fetch('http://localhost:3000/api/v1/interests', config)
     .then(r => r.json())
   })
 }

 static editUser(currentUser, username, first_name, last_name, password) {
   console.log(currentUser.id)
   let token = localStorage.getItem('token')

   let config = {
   	method: 'PATCH',
    headers: {
   		"Authorization": token,
   		"Content-Type": 'application/json',
   	},
    body: JSON.stringify({ username, password, first_name, last_name })
   }
   return fetch(`http://localhost:3000/api/v1/users/${currentUser.id}`, config)
   .then(r => r.json())

 }

 static getCampgroundFromInterest(interestID) {
   return fetch(`http://localhost:3000/api/v1/interests/${interestID}/campground`)
   .then(r => r.json())
 }

}
