import baseApi from "../http.api";

export const apiRegister = async ({ name, email, phoneNumber, password }) => {
  const payload = {
    name,
    email,
    phoneNumber,
    password,
  };
  return await baseApi.post("/auth/register", payload);
};

export const apiLogin = async ({ email, password }) => {
  const payload = {
    email,
    password,
  };
  return await baseApi.post("/auth/login", payload);
};

export const apiLogout = async () => {
  return await baseApi.post("/auth/logout");
};
