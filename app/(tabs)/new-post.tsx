import axios from "axios";
import { StyleSheet } from "react-native";

import PostForm from "../../components/PostForm";
import { Post } from "../../types/Post";
import { View } from "../../components/Themed";
import { router } from "expo-router";
import { useState } from "react";

export default function NewPost() {
  const [post, setPost] = useState({
    title: "",
    slug: "",
    dateTime: "",
    body: "",
  });

  const createPost = async (data: Post) => {
    data.dateTime = new Date().toISOString();

    try {
      const response = await axios.post(
        "http://192.168.1.21:4000/api/posts",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Post created successfully", response.data);
      router.replace("/admin");
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  return (
    <View style={styles.container}>
      <PostForm post={post} setPost={setPost} postAction={createPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 20, height: "100%" },
});
