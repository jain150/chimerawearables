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
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
    clientId: 'YOUR_CLIENT_ID',
    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
  }).then(function () {
    // do stuff with loaded APIs
    console.log('it worked');
  });
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
