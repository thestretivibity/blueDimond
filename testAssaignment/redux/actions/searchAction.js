export const ADD_QUERY = 'ADD_QUERY';

export const CLEAR_QUERIES = 'CLEAR_QUERIES';

let queryId = 0;

export const addQuery = query => ({
  type: ADD_QUERY,
  payload: {
    id: ++queryId,
    query,
  },
});

export const clearQueries = () => ({
  type: CLEAR_QUERIES,
  payload: {},
});
