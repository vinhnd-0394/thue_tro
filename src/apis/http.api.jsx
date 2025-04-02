import axios from 'axios';
import { toast } from 'react-toastify';
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS,
} from '../utils/authUtils';

const instance = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 10000,
});

let isRefreshing = false;
let refreshSubscribers = [];

instance.interceptors.request.use(
  async (config) => {
    if (config.url === '/auth/login' || config.url === '/auth/register') {
      return config;
    }
    let token;
    if (config.url === '/auth/refresh-token') {
      token = getRefreshTokenFromLS();
    } else {
      token = getAccessTokenFromLS();
    }

    if (token !== null && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      return config;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// after call api
instance.interceptors.response.use(
  (response) => {
    if (response.config.url === '/auth/refresh-token') {
      const { accessToken, refreshToken } = response.data.data;
      setAccessTokenToLS(accessToken);
      setRefreshTokenToLS(refreshToken);
    }

    if (response.config.url === '/auth/login') {
      const { accessToken, refreshToken, profile } = response.data.data;
      setAccessTokenToLS(accessToken);
      setRefreshTokenToLS(refreshToken);
      setProfileToLS(profile);
    }

    if (response.config.url === '/auth/logout') {
      clearLS();
    }
    return response.data;
  },
  (error) => {
    if (
      error.response.data.message === 'jwt expired' &&
      error.config.url !== '/refresh-token'
    ) {
      if (!isRefreshing) {
        refreshToken();
      }
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((token) => {
          error.config.headers.Authorization = `Bearer ${token}`;
          axios(error.config)
            .then((response) => {
              resolve(response.data);
            })
            .catch((error) => {
              reject(error);
            });
        });
      });
    }

    toast.error(error.response.data.message);
    return Promise.reject(error);
  }
);

// Function to refresh token
const refreshToken = async () => {
  isRefreshing = true;
  return instance
    .post('/auth/refresh-token', { refreshToken: getRefreshTokenFromLS() })
    .then((response) => {
      isRefreshing = false;
      onRefreshed(getAccessTokenFromLS());
      refreshSubscribers = [];
      return response;
    })
    .catch((error) => {
      isRefreshing = false;
      refreshSubscribers = [];
      clearLS();
      return Promise.reject(error);
    });
};

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token) {
  refreshSubscribers.map((cb) => {
    cb(token);
  });
}

export default instance;
