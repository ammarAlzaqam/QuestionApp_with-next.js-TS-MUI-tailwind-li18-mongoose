import { PostDocument } from "@/models/post";
import { UserDocument } from "@/models/user";
import axios from "axios";
import React from "react";

export const getUserData = async (
  setUser: React.Dispatch<React.SetStateAction<UserDocument | null>>
) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`
    );
    setUser(data);
  } catch (e) {
    console.log(`Error in get user handler: ${e}`);
  }
};

export const getPosts = async (
  setPosts: React.Dispatch<React.SetStateAction<PostDocument[] | null>>,
  setPages: React.Dispatch<React.SetStateAction<number>>,
  pageNumber: number = 1
) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/post?pageNumber=${pageNumber}`
    );
    setPosts(data.posts);
    setPages(data.pages);
  } catch (e) {
    console.log(`Error in get posts handler: ${e}`);
  }
};
