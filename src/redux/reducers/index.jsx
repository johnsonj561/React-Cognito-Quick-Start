// REDUX PLACEHOLDERS - MERELY EXAMPLES


import { combineReducers } from 'redux';
import todoReducer from './todo-reducer';
import counterReducer from './counter-reducer';


const reducers = combineReducers({
  todos: todoReducer,
  counter: counterReducer
});

export default reducers;
