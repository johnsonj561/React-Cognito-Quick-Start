// REDUX PLACEHOLDERS - MERELY EXAMPLES

import { INC_COUNTER, DEC_COUNTER } from './types';


export const incrementCounter = () => (dispatch) => {
  dispatch({ type: INC_COUNTER });
};

export const decrementCounter = () => (dispatch) => {
  dispatch({ type: DEC_COUNTER });
};
