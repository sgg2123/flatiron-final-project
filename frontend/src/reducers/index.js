import { combineReducers } from 'redux';
import animalReducer from './animalReducer';
import userReducer from './userReducer';


export default combineReducers({
  animal: animalReducer,
  user: userReducer,
})

// then in index imoprt reducer from './reducers'

// also, in the component in mapStateToProps change return to users: state.user.users
