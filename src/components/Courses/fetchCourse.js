import { useReducer, useEffect } from 'react';

import courses, { initialState } from '../../redux/courses';
import { FETCH_START, FETCH_FAILURE, SET_COURSES } from "../../Constants/ActionTypes";

export function FetchCourse(endpoint) {
    const [data, dispatch] = useReducer(courses, initialState);
  
    useEffect(() => {
        dispatch({ type: FETCH_START });

        fetch(endpoint)
        .then(response => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then(json => {
            dispatch({ type: SET_COURSES, payload: json });
        })
        .catch(error => {
            dispatch({ type: FETCH_FAILURE, payload: error.message });
        });
    }, [endpoint]);
  
    return data;
}