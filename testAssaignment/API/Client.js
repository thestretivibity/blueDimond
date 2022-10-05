import axios from 'axios';
import {BASE_URL, AUTH_BASE_URL} from '@env';
import {store} from '../redux/store/store';

const apiClient = axios.create({
  baseURL: BASE_URL,
});
const apiClientPUBLIC = axios.create({
  baseURL: BASE_URL,
});
// MAIN TOKENIZER METHOD WHEN LOGIN OR REGESTER USER
const apiClientToken = axios.create({
  baseURL: AUTH_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: '*/*',
  },
});
// AXIOS MIDDLEWERE THAT HANDLES PASSIG THE AUTHORIZATION TO THE SERVER
apiClient.interceptors.request.use(
  config => {
    config.headers['Authorization'] = `Bearer ${
      store.getState().Authentications?.authentication[1]?.jwtToken
    }`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
// HANDLING THE TOKEN REFRESHING IF THE MAIN TOKEN IS EXPIRED
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status == 403) {
      console.log('hello');
      return;
    }
    console.warn('network error');
  },
);
export default {
  apiClient,
  apiClientPUBLIC,
  apiClientToken,
};
