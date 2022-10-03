import {ADD_QUERY} from '../actions/searchAction';

const initialState = {
  queries: [],
};

const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUERY: {
      const {id, query} = action.payload;
      return {
        ...state,
        queries: [{id, query}, ...state.queries],
      };
    }
    default:
      return state;
  }
};

export default queryReducer;
