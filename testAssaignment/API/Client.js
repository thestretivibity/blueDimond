import {create} from 'axios';
import {BASE_URL, PUBLIC_BASE_URL} from '@env';

const apiClient = create({
  baseURL: BASE_URL,
  // headers: {
  //   Authorization: "Bearer " + { token },
  // },
});
const apiClientPUBLIC = create({
  baseURL: PUBLIC_BASE_URL,
  // headers: {
  //   Authorization: "Bearer " + { token },
  // },
});
const apiClientToken = create({
  baseURL: 'https://###/pub',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: '*/*',
  },
});

export default {
  apiClient,
  apiClientPUBLIC,
  apiClientToken,
};
