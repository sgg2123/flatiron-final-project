import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer.js'
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/css/index.css';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();
const store = createStore(
  reducer,
  persistedState,
);

store.subscribe(() => {
  saveState({
    currentUser: store.getState().currentUser,
    interests: store.getState().interests,
    facility: store.getState().facility,
    description: store.getState().description,
    imgs: store.getState().imgs,
    streetAddress: store.getState().streetAddress,
    city: store.getState().city,
    state: store.getState().state,
    zip: store.getState().zip,
    contact: store.getState().contact,
    amenities: store.getState().amenities,
    lat: store.getState().lat,
    lng: store.getState().lng,
  });
});

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
