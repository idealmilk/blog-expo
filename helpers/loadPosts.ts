import axios from "axios";
import { Dispatch, SetStateAction } from "react";

import { Post } from "./../types/Post";

export const LoadPosts = (
  setPosts: Dispatch<SetStateAction<Post[]>>,
  currentPage: number,
  setHasMorePosts: Dispatch<SetStateAction<boolean>>
) => {
  axios
    .get(`http://192.168.1.21:4000/api/posts?page=${currentPage}&limit=10`)
    .then((response) => {
      if (currentPage > 1) {
        setPosts((prevPosts: Post[]) => [...prevPosts, ...response.data]);
      } else {
        setPosts(response.data); // Set new posts for the first page
      }

      // Disable "Load More" if fewer than 10 posts are returned
      if (response.data.length < 10) {
        setHasMorePosts(false);
      }
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
      setHasMorePosts(false); // Disable "Load More" in case of an error
    });
};
