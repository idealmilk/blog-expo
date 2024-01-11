import axios from "axios";
import { StyleSheet } from "react-native";

import PostForm from "./../components/PostForm";
import { Post } from "./../types/Post";
import { View } from "../components/Themed";

export default function NewPost() {
  const createPost = async (data: Post) => {
    data.dateTime = new Date().toISOString();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/posts",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Post created successfully", response.data);
      // router.push("/admin");
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  return (
    <View style={styles.container}>
      <PostForm postAction={createPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 20 },
});
