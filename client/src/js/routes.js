/**
 * @module routes
 * @description 路由文件
 * @author wing
 */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import asyncComponent from './common/components/asyncComponent';


const Login = asyncComponent(() =>
  System.import('./Login').then(module => module.default)
)

const Routes = () => (
  <Switch>
    <Route path="/login" component={Login} />
  </Switch>
);

export default Routes;