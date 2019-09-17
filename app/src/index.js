import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './store/reducers/index'

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import gapi from 'gapi-client';

const rootReducer = reducer;
const store = createStore(rootReducer);

gapi.load('client:auth2', initClient);

// Initialize the API client library
function initClient() {
  gapi.client.init({
    discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    apiKey: 'AIzaSyBOoFBxxw4w3hphPBGb_P4nKriNBPFf_n4',
    clientId: '1030014197436-1oftnoda9j1qk7qgv0cpjbc625q1qr2k.apps.googleusercontent.com',
    scope: "https://www.googleapis.com/auth/spreadsheets"

  }).then(function () {
    // do stuff with loaded APIs
    console.log(gapi.client);
  }, function(error) {
    console.log(error);
  });
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
