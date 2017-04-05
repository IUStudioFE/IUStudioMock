/**
 * @author wing
 */

import Immutable from 'immutable';
import {
    LOGIN_FAIL,
    CHANGE_LOADING_STATE,
    LOGIN_SUCCESS
} from '../constants/actionTypes.js';

const initialState = Immutable.Map({
    loading: false,
    username: '',
    password: '',
    success: false
})

function reducer(state = initialState, action) {
    switch(action.type) {
        case CHANGE_LOADING_STATE:
            return state.set('loading', action.playload);
        case LOGIN_FAIL:
            return state.set('loading', false)
                        .set('success', false);
        case LOGIN_SUCCESS:
            return state.set('loading': false)
                        .set('success': true)
        default:
            return state;
    }
}


export default reducer;