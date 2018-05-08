// REDUX PLACEHOLDERS - MERELY EXAMPLES


import { INC_COUNTER, DEC_COUNTER } from '../actions/types';

const initialState = {
  count: 0
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INC_COUNTER:
      return {
        ...state,
        count: state.count + 1
      };
    case DEC_COUNTER:
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}
