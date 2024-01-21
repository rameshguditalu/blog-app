import { OutputData } from "@editorjs/editorjs";
import { UserAccount } from "../../../profile/services/profileService";

export type BlogType = {
  title: string;
  image: string;
  content: OutputData;
  tags: string[];
  description: string;
  author: UserAccount;
};
