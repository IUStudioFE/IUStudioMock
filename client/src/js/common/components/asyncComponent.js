/**
 * @module src/js/common/components/asyncComponent
 * @description 异步加载组件
 * @author wing
 * 
 */
import React from 'react';

function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(Component => {
          AsyncComponent.Component = Component
          this.setState({ Component })
        })
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return null
    }
  }
}

export default asyncComponent;