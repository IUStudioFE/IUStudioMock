/**
 * @module src/js/index
 * @description app主文件
 * @author wing
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import routes from './routes';
import store from './store';
export default class App extends Component {
  render() {
    return (
       <Provider store={store}>
          {routes}
      </Provider>
    );
  }
}