import axios from "axios";

export const isAxiosError = (error) => {
  return axios.isAxiosError(error);
};

export const setAccessTokenToLS = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
};

export const setRefreshTokenToLS = (refreshToken) => {
  localStorage.setItem("refreshToken", refreshToken);
};

export const setProfileToLS = (profile) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};

export const clearAccessTokenToLS = () => {
  localStorage.removeItem("accessToken");
};

export const clearRefreshTokenToLS = () => {
  localStorage.removeItem("refreshToken");
};

export const clearProfileToLS = () => {
  localStorage.removeItem("profile");
};

export const clearLS = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("profile");
};

export const getAccessTokenFromLS = () =>
  localStorage.getItem("accessToken") || "";

export const getRefreshTokenFromLS = () =>
  localStorage.getItem("refreshToken") || "";

export const getProfileFromLS = () =>
  JSON.parse(localStorage.getItem("profile")) || null;
