import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// creates the "store"
import { createStore, applyMiddleware, compose } from 'redux'

// function that takes in state and action
import reducer from './Redux/reducer.js'

// (a Component that) allows this React app to know about Redux store
import { Provider } from 'react-redux'

import thunk from 'redux-thunk'

// import 'semantic-ui-css/semantic.css';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

const store = createStore(reducer, enhancer)


ReactDOM.render(

  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
