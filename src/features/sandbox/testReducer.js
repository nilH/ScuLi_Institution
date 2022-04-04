import { asyncActionError, asyncActionFinish, asyncActionStart } from '../../app/async/asyncReducer';

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// initial state must be a {} or []
const initialState = {
  data: 42,
};

// action creators
export function increment(amount) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    // ERROR CATCHING
    try {
      await delay(1000);
      dispatch({ type: INCREMENT_COUNTER, payload: amount });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
    }
  };
}
export function decrement(amount) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    try {
      await delay(1000);
      dispatch({ type: DECREMENT_COUNTER, payload: amount });
      dispatch(asyncActionFinish());
    } catch (error) {
      dispatch(asyncActionError(error));
      // toast.error(error);
    }
  };
}

// actions
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

// reducers
export default function testReducer(state = initialState, { type, payload }) {
  switch (type) {
    case INCREMENT_COUNTER:
      return {
        ...state,
        data: state.data + payload,
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        data: state.data - payload,
      };
    default:
      return state;
  }
}
