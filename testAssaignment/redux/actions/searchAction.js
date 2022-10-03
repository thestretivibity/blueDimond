export const ADD_QUERY = 'ADD_QUERY';

let queryId = 0;

export const addQuery = query => ({
  type: ADD_QUERY,
  payload: {
    id: ++queryId,
    query,
  },
});
