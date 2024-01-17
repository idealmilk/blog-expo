import { TAuthCredentials, TUser } from "../types/User";
import { get, post } from "../utils/fetch";

export const RegisterAPI = async (data: TAuthCredentials) => {
  try {
    await post("http://192.168.1.6:4000/api/auth/register", data);
  } catch (error) {
    console.error("Failed to register", error);
  }
};

export const SignInAPI = async (data: TAuthCredentials) => {
  try {
    await post(`http://192.168.1.6:4000/api/auth/signin`, data);
  } catch (error) {
    console.error("Failed to sign in", error);
  }
};

export const GetUserAPI = async () => {
  try {
    let res = (await get(`http://192.168.1.6:4000/api/auth/me`)) as TUser;
    return res;
  } catch (error) {
    console.error("Failed to get user", error);
  }
};

export const LogoutAPI = async () => {
  try {
    await get(`http://192.168.1.6:4000/api/auth/logout`);
  } catch (error) {
    console.error("Failed to logout", error);
  }
};
