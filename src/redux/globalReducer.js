import { TOGGLE_LOADING, TOGGLE_LOGGED_STATUS, SET_PAGE, RESET_APP } from '../Constants/ActionTypes';
import { COURSES } from '../Constants';

export const initialState = {
  isLoading: false,
  isLoggedIn: false,
  currentPage: COURSES
};

export const globalReducer = ( state = initialState, action = {} ) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    case TOGGLE_LOGGED_STATUS:
      return {
        ...state,
        isLoggedIn: action.payload
      };

    case SET_PAGE:
      return {
        ...state,
        currentPage: action.payload
      };

    case RESET_APP:
      return {
        ...state
      }

    default:
      return state
  }
};

export default globalReducer
