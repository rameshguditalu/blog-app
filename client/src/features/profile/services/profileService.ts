import axios from "axios";
import { appConfig } from "../../../common/model/route.model";

export type UserAccount = {
  personal_info: {
    id?: string;
    email?: string;
    userName?: string;
    fullName?: string;
    password?: string;
    profileImage?: string;
  };
};

export type AxiosResponse = {
  success: boolean;
  message: string;
  authToken?: string;
  data?: UserAccount;
};

export function registerUser(formData: UserAccount): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post(`${appConfig.REACT_API_BASE_URL}api/user/register`, {
        email: formData.personal_info.email,
        fullName: formData.personal_info.fullName,
        password: formData.personal_info.password,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
}

export function loginUser(formData: UserAccount): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post(`${appConfig.REACT_API_BASE_URL}api/user/login`, {
        email: formData.personal_info.email,
        password: formData.personal_info.password,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err?.response?.data));
  });
}
