// REDUX PLACEHOLDERS - MERELY EXAMPLES

import { GET_TODOS, POST_TODO } from './types';

const d = new Date();

const todos = [
  {
    name: 'Todo 1',
    description: 'A short decsription',
    status: 'pending',
    createDate: d
  },
  {
    name: 'Todo 2',
    description: 'A short decsription',
    status: 'complete',
    createDate: new Date(d.getTime() + (60 * 1000))
  },
  {
    name: 'Todo 3',
    description: 'A short decsription',
    status: 'complete',
    createDate: new Date(d.getTime() + (120 * 1000))
  },
  {
    name: 'Todo 4',
    description: 'A short decsription',
    status: 'complete',
    createDate: new Date(d.getTime() + (180 * 1000))
  }
];


export const fetchTodos = () => (dispatch) => {
  dispatch({
    type: GET_TODOS
  });
};

export const postTodo = () => (dispatch) => {
  dispatch({
    type: POST_TODO,
    payload: todos
  });
};
