import axios from "axios";

export type User = {
  id?: string;
  email?: string;
  userName?: string;
  fullName?: string;
  password?: string;
  profileImage?: string;
};

export type AxiosResponse = {
  success: boolean;
  message: string;
  authToken?: string;
  data?: User;
};

export function registerUser(formData: User): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:8080/api/user/register", {
        email: formData.email,
        fullName: formData.fullName,
        password: formData.password,
      })
      .then((response) => {
        console.log("here");
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
}

export function loginUser(formData: User): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:8080/api/user/login", {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err?.response?.data));
  });
}
