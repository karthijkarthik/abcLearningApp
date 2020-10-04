import { TOGGLE_LOADING, TOGGLE_LOGGED_STATUS, SET_PAGE } from '../Constants/ActionTypes';

export const changePage = (pageName) => ({
    type: SET_PAGE,
    payload: pageName
});

export const toggleLoader = (value) => ({
    type: TOGGLE_LOADING,
    payload: value
});

export const toggleLogedStatus = (value) => ({
    type: TOGGLE_LOGGED_STATUS,
    payload: value
});