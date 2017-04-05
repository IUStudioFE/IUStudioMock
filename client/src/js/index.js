/**
 * @module src/js/index
 * @description app入口文件
 * @author wing
 */

import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
// AppContainer 是一个 HMR 必须的包裹(wrapper)组件

import Root from './Root';
import '../sass/main.scss';

// import routes from './routes';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
        <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(Root);

// 模块热替换的 API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(Root)
  });
}