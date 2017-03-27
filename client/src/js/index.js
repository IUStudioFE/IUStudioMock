/**
 * @module src/js/index
 * @description app入口文件
 * @author wing
 */
import 'react-hot-loader/patch';
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
// AppContainer 是一个 HMR 必须的包裹(wrapper)组件

import App from './App';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('app')
  );
};

render(App);

// 模块热替换的 API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  });
}