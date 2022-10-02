import {create} from 'axios';

const apiClient = create({
  baseURL: 'https://api.nytimes.com/svc/',
  // headers: {
  //   Authorization: "Bearer " + { token },
  // },
});
const apiClientPUBLIC = create({
  baseURL: 'https://www.nytimes.com/svc/',
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
