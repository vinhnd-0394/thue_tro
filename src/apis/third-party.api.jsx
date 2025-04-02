import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://rsapi.goong.io',
});

// after call api
instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;
