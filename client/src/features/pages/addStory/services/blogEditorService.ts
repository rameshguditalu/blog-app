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

export class LatestBlogs {
  activity: {
    likes: number;
    comments: number;
    reads: number;
    parentComments: number;
  } = {
    likes: 0,
    comments: 0,
    reads: 0,
    parentComments: 0,
  };
  blogId: string;
  title: string;
  image: string;
  description: string;
  tags: string[];
  author: {
    personal_info: {
      profile_img: string;
      fullName: string;
      userName: string;
    };
  } = {
    personal_info: {
      profile_img: "",
      fullName: "",
      userName: "",
    },
  };
  createdAt: string;
  constructor(data: LatestBlogs) {
    this.activity.comments = data.activity.comments;
    this.activity.likes = data.activity.likes;
    this.activity.reads = data.activity.reads;
    this.activity.parentComments = data.activity.comments;
    this.title = data.title;
    this.blogId = data.blogId;
    this.image = data.image;
    this.description = data.description;
    this.tags = data.tags;
    this.author.personal_info.fullName = data.author.personal_info.fullName;
    this.author.personal_info.userName = data.author.personal_info.userName;
    this.author.personal_info.profile_img =
      data.author.personal_info.profile_img;
    this.createdAt = data.createdAt;
  }
}

export type AxiosResponse = {
  success: boolean;
  message?: string;
  data?: any;
};

export function createBlog(
  blogObj: BlogType,
  authToken: string,
  userId: string
): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      params: {
        p1: userId,
      },
    };

    axios
      .post(
        "http://localhost:8080/api/blog/create-blog",
        blogObj,
        requestConfig
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
}

export function fetchLatestBlogs(): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:8080/api/blog/latest-blogs")
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
}

export function fetchTrendingBlogs(): Promise<AxiosResponse> {
  return new Promise((resolve, reject) => {
    axios
      .get("http://localhost:8080/api/blog/trending-blogs")
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => reject(err));
  });
}
