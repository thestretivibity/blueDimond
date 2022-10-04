export const GET_ARTICLES = 'GET_ARTICLES';
export const GET_COMMENTS = 'GET_COMMENTS';
export const SEARCH_ARTICLES = 'SEARCH_ARTICLES';

import ApiCall from '../../API/ApiCall';

export const getArticles = category => async dispatch => {
  try {
    const res = await ApiCall.getArticles(category);

    dispatch({
      type: GET_ARTICLES,
      payload: res,
    });
    console.log('yeah');
  } catch (err) {
    console.log(err);
  }
};
