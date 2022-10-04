import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.nytimes.com/svc/",
  // headers: {
  //   Authorization: "Bearer " + { token },
  // },
});
const apiClientPUBLIC = axios.create({
  baseURL: "https://www.nytimes.com/svc/",
  // headers: {
  //   Authorization: "Bearer " + { token },
  // },
});

export default {
  apiClient,
  apiClientPUBLIC,
};
