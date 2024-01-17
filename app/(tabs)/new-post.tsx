import axios from "axios";
import { StyleSheet } from "react-native";

import PostForm from "../../components/post-form";
import { TPost } from "../../types/Post";
import { View } from "../../components/themed";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { CreatePost } from "../../api/posts";

export default function NewPost() {
  const [post, setPost] = useState({
    title: "",
    slug: "",
    dateTime: "",
    body: "",
  });

  const createNewPost = useCallback(
    async (data: TPost) => {
      try {
        await CreatePost(data);
        router.push(`/blog/${data.slug}`);
      } catch (error) {
        console.error("Failed to create post", error);
      }
    },
    [router]
  );

  return (
    <View style={styles.container}>
      <PostForm post={post} setPost={setPost} postAction={createNewPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: "100%" },
});
