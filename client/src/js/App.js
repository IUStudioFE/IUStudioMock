/**
 * @module src/js/index
 * @description app主文件
 * @author wing
 */
import React, { Component } from 'react';

import Routes from './routes';

export default class App extends Component {
  render() {
    return (
        <Routes />
    );
  }
}