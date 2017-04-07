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

const routes = (history) => {
  return (
    <Router history={history}>
      <Route 
        path="/login"
        getComponent={(location, cb) => {
          System.import('./Login').then(loadRoute(cb)).catch(errorLoading);
        }}
      />
      <Route 
        path="/"
        getComponent={(location, cb) => {
          System.import('./App').then(loadRoute(cb)).catch(errorLoading);
        }}
      />
    </Router>
  )
}

/*const routes = () => {
  return (
    <Route
        getComponent={(location, cb) => {
          System.import('./App').then(loadRoute(cb)).catch(errorLoading);
        }}>
      
    </Route>
  )
}*/

export default routes;