import axios from "axios";
import { StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";

import { Text, View } from "../../components/Themed";
import { formatDate } from "../../helpers/formatDate";
import { Post } from "../../types/Post";

export default function EditBlogPost() {
  const { slug } = useLocalSearchParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/posts/${slug}`)
      .then((response) => {
        console.log("Fetched post:", response.data); // Log the fetched post
        setPost(response.data);
      })
      .catch((error) => console.error("Error fetching post:", error));
  }, [slug]);

  if (!post) {
    return <div>Loading..</div>;
  }

  const dateTime = new Date(post.dateTime);

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Text style={styles.date}>{formatDate(dateTime)}</Text>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.body}>{post.body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", paddingTop: 40 },
  wrap: { width: "80%", marginHorizontal: "auto" },
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
