/**
 * @module actions
 * @author wing
 */

import { message } from 'antd';
import { post, onSuccess, onError } from '$utils/fetcher';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_LOADING,
    CHANGE_LOADING_STATE
} from '../constants/actionTypes.js';

export function changeLoadingState(loading) {
    return {
        type: CHANGE_LOADING_STATE,
        playload: loading
    }
}

export function loginSuccess() {
    return {
        type: LOGIN_SUCCESS
    }
}

export function loginFail(res) {
    return {
        type: LOGIN_FAIL
    }
}

export function login({ username, password }) {
    return (dispatch) => {
        dispatch(changeLoadingState(true));
        post('/api/v1/passport/auth/login', {
            username,
            password
        }).then(onSuccess, onError('登录失败,请重新登录!'))
          .then((res) => {
              if(!res.code) {
                 // 跳转
                 dispatch(changeLoadingState(false));
                 dispatch(loginSuccess());
              } else {
                  dispatch(changeLoadingState(false));
                  message.error(res.msg);
                  dispatch(loginFail());
              }
          })
          .catch((err) => {
              dispatch(changeLoadingState(false));
              message.error('登录失败,请重新登录!');
              dispatch(loginFail());
          })
    }
}