import { FlatList, Pressable, StyleSheet } from "react-native";
import { LoadPosts } from "../../helpers/loadPosts";

import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import { Post } from "../../types/Post";
import PostCard from "../../components/PostCard";
import { Link } from "expo-router";

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  useEffect(() => {
    LoadPosts(setPosts, currentPage, setHasMorePosts);
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <View style={styles.container}>
      {posts && posts.length > 0 && (
        <FlatList
          data={posts}
          renderItem={({ item }) => <PostCard data={item} />}
          keyExtractor={(item) => item.slug}
          style={styles.list}
        />
      )}

      {hasMorePosts && (
        <Pressable style={styles.button} onPress={handleLoadMore}>
          <Text style={styles.text}>Load More</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  list: { paddingHorizontal: 20, paddingTop: 20 },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
