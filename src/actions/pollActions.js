// pollActions.js

import axios from 'axios';

// Action Types
export const FETCH_POLLS_REQUEST = 'FETCH_POLLS_REQUEST';
export const FETCH_POLLS_SUCCESS = 'FETCH_POLLS_SUCCESS';
export const FETCH_POLLS_FAILURE = 'FETCH_POLLS_FAILURE';

// Action Creators
export const fetchPollsRequest = () => ({
  type: FETCH_POLLS_REQUEST,
});

export const fetchPollsSuccess = (polls) => ({
  type: FETCH_POLLS_SUCCESS,
  payload: polls,
});

export const fetchPollsFailure = (error) => ({
  type: FETCH_POLLS_FAILURE,
  payload: error,
});

// Thunk Function
export const fetchPolls = () => {
  return async (dispatch) => {
    dispatch(fetchPollsRequest());
    try {
      const response = await axios.get('/api/v1/user/voting');
      dispatch(fetchPollsSuccess(response.data));
    } catch (error) {
      dispatch(fetchPollsFailure(error.message));
    }
  };
};
