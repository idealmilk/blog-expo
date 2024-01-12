import axios from "axios";
import { StyleSheet } from "react-native";

import PostForm from "../../components/PostForm";
import { Post } from "../../types/Post";
import { View } from "../../components/Themed";
import { router, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";

export default function NewPost() {
  const { slug } = useLocalSearchParams();
  const [post, setPost] = useState<Post | null>(null);
  const [originalSlug, setOriginalSlug] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/posts/${slug}`)
      .then((response) => {
        console.log("Fetched post:", response.data); // Log the fetched post
        setPost(response.data);
        setOriginalSlug(response.data.slug);
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [slug]);

  if (!post) {
    return <div>Loading..</div>;
  }

  const editPost = async (data: Post) => {
    data.dateTime = post.dateTime;

    try {
      const response = await axios.put(
        `http://localhost:4000/api/posts/${originalSlug}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Post updated successfully");
      router.push("/admin");
    } catch (error) {
      console.error("Failed to update post", error);
    }
  };

  return (
    <View style={styles.container}>
      <PostForm post={post} postAction={editPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 20 },
});
