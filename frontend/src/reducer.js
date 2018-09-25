const initialState = {
  toggled3D: false,
  facility: '',
  lat: '',
  lng: '',
  description: '',
  streetAddress: '',
  city: '',
  state: '',
  zip: '',
  contact: [],
  amenities: [],
  imgs: [],
  searchTerm: '',
  sewer: false,
  water: false,
  pull: false,
  pets: false,
  waterfront: false,
  siteList: [],
  formSubmitted: false,
  contractID: 'hello',
  facilityID: 'hello',
  facilityName: 'hello',
  touring3D: false,
  currentUser: {},
  interests: [],
};

export default function reducer(state = initialState, action) {
  let newState = {...state, ...action.payload};
  switch(action.type) {
    case "CHANGE_LOC":
      return newState;
    case "TOGGLE_3D":
      return newState;
    case "UPDATE_DETAILS":
      return newState;
    case "HANDLE_SEARCH_CHANGE":
      return newState;
    case "UPDATE_SITE_LIST":
      return newState;
    case "SUBMIT_FORM":
      return newState
    case "CLEAR_RESULTS":
      return newState
    case "UPDATE_SELECTED_SITE":
      return newState
    case "TAKE_TOUR":
      return newState
    case "END_TOUR":
      return newState
    case "SET_USER":
      return newState
    case "SET_INTERESTS":
      return newState
    case "CLEAR_DETAILS":
      return newState
    default:
      return state;
  }
}
