import { StyleSheet } from "react-native";
import {
  Stack,
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";
import { useState, useEffect, useCallback } from "react";

import PostForm from "../../components/post-form";
import { TPost } from "../../types/Post";
import { Text, View } from "../../components/themed";
import { ReadSinglePost, UpdatePost } from "../../api/posts";
import useUser from "../../hooks/useUser";

export default function NewPost() {
  const { loggedIn } = useUser();
  const { slug } = useLocalSearchParams();
  const [post, setPost] = useState<TPost | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (!loggedIn) router.replace("/");
    }, [loggedIn])
  );

  const fetchPost = async () => {
    try {
      const result = (await ReadSinglePost(slug as string)) as TPost;
      setPost(result);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const editPost = useCallback(
    async (data: TPost) => {
      try {
        await UpdatePost(slug as string, data);
        router.push(`/blog/${data.slug}`);
      } catch (error) {
        console.error("Failed to update post", error);
      }
    },
    [slug, router]
  );

  if (!post) {
    return <Text>Loading..</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Edit Post: ${post.title}` }} />
      <PostForm post={post} setPost={setPost} postAction={editPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 20, height: "100%" },
});
