// REDUX PLACEHOLDERS - MERELY EXAMPLES

import { GET_TODOS, POST_TODO } from '../actions/types';

const d = new Date();

const todos = [
  {
    id: 1,
    name: 'Todo 1',
    description: 'A short decsription',
    status: 'pending',
    createDate: d
  },
  {
    id: 2,
    name: 'Todo 2',
    description: 'A short decsription',
    status: 'complete',
    createDate: new Date(d.getTime() + (60 * 1000))
  },
  {
    id: 3,
    name: 'Todo 3',
    description: 'A short decsription',
    status: 'complete',
    createDate: new Date(d.getTime() + (120 * 1000))
  },
  {
    id: 4,
    name: 'Todo 4',
    description: 'A short decsription',
    status: 'complete',
    createDate: new Date(d.getTime() + (180 * 1000))
  }
];

const initialState = {
  todos: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos
      };
    case POST_TODO:
    default:
      return state;
  }
}
