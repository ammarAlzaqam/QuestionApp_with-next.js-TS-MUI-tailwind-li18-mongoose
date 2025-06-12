import { PostDocument } from "@/models/post";
import { TagDocument } from "@/models/tag";
import { useUserStore } from "@/stores/userStore";
import axios from "axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { notFound } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

export const getUserData = async () => {
  try {
    const { data: user } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/me`
    );
    useUserStore.getState().setUser(user);
  } catch (e) {
    console.log(`Error in get user handler: ${e}`);
  }
};

export const getPosts = async (
  setPosts: React.Dispatch<React.SetStateAction<PostDocument[] | null>>,
  setPages: React.Dispatch<React.SetStateAction<number>>,
  pageNumber: number = 1,
  sort: number = -1,
  tag: string = ""
) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/post?pageNumber=${pageNumber}&sort=${sort}&tag=${tag}`
    );
    setPosts(data.posts);
    setPages(data.pages);
  } catch (e) {
    console.log(`Error in get posts handler: ${e}`);
  }
};

export const getSinglePost = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.log(`Error in show single question page: ${errorData}`);
      notFound();
    }
    return await response.json();
  } catch (e: any) {
    console.log(`Error in show single question page: ${e}`);
    notFound();
  }
};

export const makeVote = async (
  postId: string,
  voteType: boolean,
  router: AppRouterInstance
) => {
  try {
    await axios.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/vote`, {
      postId,
      voteType,
    });
    router.refresh();
  } catch (e) {
    console.log(e);
  }
};

export const getAllTags = async (
  setTags: Dispatch<SetStateAction<TagDocument[] | null>>
) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tag`
    );
    setTags(data);
  } catch (e: any) {
    throw new Error(`Error in fetch all Tags: ${e.response?.data.message}`);
  }
};
