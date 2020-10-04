import fetch from 'unfetch';
import axios from 'axios';

import { SET_CUSTOMER_ID, SET_PASSWORD, SET_LOGIN_ERROR, SET_ENROLLED_COURSE } from '../Constants/ActionTypes';
import { toggleLoader, toggleLogedStatus } from './GlobalActions';
import { INVALID_USER } from '../Constants';

export const setCustomerId = (value) => ({
  type: SET_CUSTOMER_ID,
  payload: value
});

export const setPassword = (value) => ({
  type: SET_PASSWORD,
  payload: value
});

export const validateCustomer = (id) => (dispatch, getState) => {
  const { userDetails: { customerId, password, loginError } } = getState();
  dispatch(toggleLoader(true));
  
  return fetch(`http://localhost:3000/users/${customerId}`)
    .then(res => res.json())
    .then((result) => {
      if(Object.keys(result).length !== 0 && result.id === customerId && result.password === password) {
        dispatch(toggleLogedStatus(true));

        const loguser = {
          loggedUser: customerId
        };
        localStorage.setItem('abclearningAppUser', JSON.stringify(loguser));

        dispatch(addCourse(id));

        if(loginError !=='') {
          dispatch({ type: SET_LOGIN_ERROR, payload: '' });
        }
      } else {
        dispatch({ type: SET_LOGIN_ERROR, payload: INVALID_USER });
      }
      dispatch(toggleLoader(false));
    })
}

export const getEnrolledCourse = async(id) => {
  const result = await axios.get(`http://localhost:3000/users?id=${id}`);
  return result.data;
}

export const addCourse = (id) => (dispatch, getState) => {
  const { userDetails: { customerId }} = getState();
  const userData = getEnrolledCourse(customerId);
  userData.then(res => {
    const enrolledCourses = res[0].enrolledCourse;
    enrolledCourses.push(id);
    return axios.put(`http://localhost:3000/users/${customerId}/`, {
      ...res[0],
      enrolledCourse: enrolledCourses
    }).then(resp => {
      dispatch({
        type: SET_ENROLLED_COURSE,
        payload: enrolledCourses
      });
    }).catch(error => {
        return error;
    });
  })
}

export const deleteCourse = (id) => (dispatch, getState) => {
  const { userDetails: { enrolledCourses }} = getState();
  const deleteindex = enrolledCourses.indexOf(id);
  enrolledCourses.splice(deleteindex, 1);
  dispatch({
    type: SET_ENROLLED_COURSE,
    payload: enrolledCourses
  });
}