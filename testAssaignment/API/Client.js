import axios from 'axios';
import {BASE_URL, AUTH_BASE_URL} from '@env';
import {store} from '../redux/store/store';
import {_refreshToken} from '../redux/actions/authenticationAction';

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
const refreshTheToken = () =>
  apiClientToken(
    `/refresh?refresh_token=${
      store.getState().Authentications?.authentication[1]?.refresh_token
    }&email=${store.getState().Authentications?.authentication[1]?.email}`,
  );

// HANDLING THE TOKEN REFRESHING IF THE MAIN TOKEN IS EXPIRED
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response.status == 403) {
      store.dispatch(_refreshToken());

      console.log(store.getState().Authentications?.authentication[1]);

      return Promise.resolve(error);
    } else {
      console.warn('network error');
      return Promise.resolve(error);
    }
  },
);

export default {
  apiClient,
  apiClientPUBLIC,
  apiClientToken,
  refreshTheToken,
};
