/**
 * @module store.js
 * @description App store
 * @author wing
 */
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';

import { combineReducers } from 'redux-immutable';
import thunkMiddleware from 'redux-thunk';

import loginInfo from './Login/reducers';

const reducer = combineReducers({
    loginInfo
})

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;