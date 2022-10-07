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
});
// AXIOS INTERCEPTOR THAT HANDLES PASSIG THE AUTHORIZATION TO THE SERVER
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
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      await store.dispatch(_refreshToken());
      return apiClient(originalRequest);
    } else {
      return error.response;
    }
  },
);

// LOGIN AND TOKEN LOGISTICS HANDLING
apiClientToken.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

apiClientToken.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    if (error.response.status == 401) return error.response;
    return error;
  },
);

export default {
  apiClient,
  apiClientPUBLIC,
  apiClientToken,
  refreshTheToken,
};
