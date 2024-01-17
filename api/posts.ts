import { TPost } from "../types/Post";
import dayjs from "../utils/dayjs";
import { get, post, put, destroy } from "../utils/fetch";

export const CreatePost = async (data: TPost) => {
  const currentDate = dayjs(new Date());
  data.dateTime = currentDate.toISOString();

  try {
    await post("http://192.168.1.6:4000/api/posts", data);
  } catch (error) {
    console.error("Failed to create post", error);
  }
};

export const ReadAllPosts = async (currentPage: number, limit: number) => {
  try {
    const response = await get<TPost[]>(
      `http://192.168.1.6:4000/api/posts?page=${currentPage}&limit=${limit}`
    );
    return response;
  } catch (error) {
    console.error("Failed to load posts", error);
  }
};

export const ReadSinglePost = async (slug: string) => {
  try {
    const response = await get<TPost>(
      `http://192.168.1.6:4000/api/posts/${slug}`
    );
    return response;
  } catch (error) {
    console.error("Failed to load posts", error);
  }
};

export const UpdatePost = async (originalSlug: string, data: TPost) => {
  try {
    await put(`http://192.168.1.6:4000/api/posts/${originalSlug}`, data);
  } catch (error) {
    console.error("Failed to update post", error);
  }
};

export const DeletePostBySlug = async (slug: string) => {
  try {
    const response = await destroy(`http://192.168.1.6:4000/api/posts/${slug}`);
    return response;
  } catch (error) {
    console.error("Failed to delete post", error);
  }
};
