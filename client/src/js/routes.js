/**
 * @module routes
 * @description 路由文件
 * @author wing
 */
import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';

function errorLoading(err) {
 console.error('Dynamic page loading failed', err);
}


function loadRoute(cb) {
 return (module) => cb(null, module.default);
}

export default (
  <Router history={browserHistory}>
    <Route 
      path="/login"
      getComponent={(location, cb) => {
        System.import('./Login').then(loadRoute(cb)).catch(errorLoading);
      }}
    />
     <Route 
      path="/"
      getComponent={(location, cb) => {
        System.import('./App.js').then(loadRoute(cb)).catch(errorLoading);
      }}
    />
  </Router>
)