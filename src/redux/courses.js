import { SET_COURSES, FETCH_START, FETCH_FAILURE } from '../Constants/ActionTypes';

export const initialState = {
  loading: false,
  error: "",
  courses: []
};

export const courses = ( state = initialState, action = {}) => {
  console.log(action);
  switch (action.type) {
    case FETCH_START:
      return { 
        ...state, 
        loading: true 
      };

    case FETCH_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };

    case SET_COURSES:
      return {
        ...state,
        loading: false,
        courses: action.payload
      };

    default:
      return state
  }
};

export default courses;
