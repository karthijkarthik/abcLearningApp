import { SET_CUSTOMER_ID, SET_PASSWORD, SET_LOGIN_ERROR, SET_ENROLLED_COURSE } from '../Constants/ActionTypes';

export const initialState = {
  customerId: '',
  password: '',
  loginError: '',
  enrolledCourses: []
};

export const userDetails = ( state = initialState, action = {} ) => {
  switch (action.type) {
    case SET_CUSTOMER_ID:
      return {
        ...state,
        customerId: action.payload
      };

    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload 
      };

    case SET_LOGIN_ERROR:
      return {
        ...state,
        loginError: action.payload 
      };

    case SET_ENROLLED_COURSE:
      return {
        ...state,
        enrolledCourses: action.payload 
      };

    default:
      return state
  }
};

export default userDetails
