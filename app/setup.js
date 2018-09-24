//@flow

import React from 'react';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers'

import App from './components/App';

function setup(){
  const store = createStore(rootReducer)
  class Root extends React.Component<any> {

    render() {
      return (
        <Provider store={store}>
          <App />
        </Provider>
      );
    }
  }

  return Root;
}

module.exports = setup;
