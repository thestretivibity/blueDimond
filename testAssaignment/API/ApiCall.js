import clientApi from './Client';
import qs from 'qs';
const searchArticles = (query, page) =>
  clientApi.apiClient(
    /* A query string. */
    `searchArticles?query=${query}&page=${page}`,
  );

const getComments = url =>
  clientApi.apiClient(`getComments?url=${escape(url)}`);
const getArticles = category =>
  clientApi.apiClient(`getArticles?category=${category}`);

const logIn = data =>
  clientApi.apiClientToken.post('login', qs.stringify(data, {encode: true}));
const signUp = data =>
  clientApi.apiClientToken.post('register', qs.stringify(data, {encode: true}));

export default {
  searchArticles,
  getComments,
  getArticles,
  logIn,
  signUp,
};
