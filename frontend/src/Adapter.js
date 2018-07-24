import convert from 'xml-js';

export default class Adapter {
  static getDetails() {
    return (
      // change to get contract & facility ids from what they clicked on in list
      fetch('http://localhost:3000/api/v1/campgrounds')
      .then(r => r.json())
      .then(data => {
        const options = {compact: true, ignoreComment: true, spaces: 4};
        // const contractID = data[0]['contract_id'];
        // const facilityID = data[0]['facility_id'];
        return (
          fetch(`https://cors-anywhere.herokuapp.com/http://api.amp.active.com/camping/campground/details?contractCode=CO&parkId=50032&api_key=hmn6tzctjc74t3268nr7t4uh`)
          // fetch(`https://cors-anywhere.herokuapp.com/https://www.reserveamerica.com/campgroundDetails.do?contractCode=${contractID}&parkId=${facilityID}&xml=true`)
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
}
