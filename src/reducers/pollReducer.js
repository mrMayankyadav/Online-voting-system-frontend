// pollReducer.js

import {
    FETCH_POLLS_REQUEST,
    FETCH_POLLS_SUCCESS,
    FETCH_POLLS_FAILURE,
  } from '../actions/pollActions';
  
  const initialState = {
    polls: [],
    loading: false,
    error: null,
  };
  
  const pollReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_POLLS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_POLLS_SUCCESS:
        return {
          ...state,
          polls: action.payload,
          loading: false,
          error: null,
        };
      case FETCH_POLLS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default pollReducer;
  