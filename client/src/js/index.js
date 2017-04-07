/**
 * @module src/js/index
 * @description app入口文件
 * @author wing
 */

import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
// AppContainer 是一个 HMR 必须的包裹(wrapper)组件

// import Root from './Root';
import '../sass/main.scss';
import routes from './routes';
import store from './store';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';

/*const render = (Component, routes) => {
  ReactDOM.render(
    <AppContainer>
        <Component routes={routes} />
    </AppContainer>,
    document.getElementById('app')
  );
};

render(Root, routes);*/

render(
  <Provider store={store}>
    {routes(browserHistory)}
  </Provider>,
  document.getElementById('app')
)

// 模块热替换的 API
/*if (module.hot) {
  module.hot.accept('./Root', () => {
    ReactDOM.render(
      <AppContainer>
        <Root routes={require('./routes').default} />,
      </AppContainer>,
      document.getElementById('app')
    )
  });
}*/

if (module.hot) {
  import('react-hot-loader').then(({ AppContainer }) => {
    module.hot.accept('./routes', () => {
      import('./routes')
      .then((routerModule) => {
        render(
          <AppContainer key={module.hot ? new Date() : undefined}>
            <Provider store={store}>
              {routerModule.default(browserHistory)}
            </Provider>
          </AppContainer>,
          document.getElementById('app')
        );
      });
    });
  });
}