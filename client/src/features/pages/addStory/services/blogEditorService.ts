import { OutputData } from "@editorjs/editorjs";
import axios from "axios";

export type BlogType = {
  title: string;
  image: string;
  content: OutputData;
  tags: string[];
  description: string;
  author?: any;
  draft?: boolean;
};

export type AxiosResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export function createBlog(
  blogObj: BlogType,
  authToken: string
): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    axios
      .post("http://localhost:8080/api/blog/create-blog", blogObj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
}
