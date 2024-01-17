import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { ReadSinglePost } from "../../api/posts";
import { Text, View } from "../../components/Themed";
import { TPost } from "./../../types/Post";
import dayjs from "dayjs";

export default function BlogPost() {
  const { slug } = useLocalSearchParams();
  const [post, setPost] = useState<TPost | null>(null);

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

  if (!post) {
    return <Text>Loading..</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Blog: ${post.title}` }} />
      <View style={styles.wrap}>
        <Text style={styles.date}>
          {dayjs(post.dateTime).format("YYYY/MM/DD")}
        </Text>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", height: "100%", paddingTop: 20 },
  wrap: { paddingHorizontal: 20 },
  date: {
    fontSize: 12,
    fontWeight: "300",
  },
  title: {
    paddingBottom: 40,
    paddingTop: 20,
    fontSize: 24,
    height: 1,
    width: "80%",
  },
  body: {},
});
