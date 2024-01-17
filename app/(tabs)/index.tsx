import { FlatList, Pressable, StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { useEffect, useState } from "react";
import { TPost } from "../../types/Post";
import PostCard from "../../components/PostCard";
import { ReadAllPosts } from "../../api/posts";

export default function HomeScreen() {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const limit = 10;

  const fetchPosts = async () => {
    try {
      const result = await ReadAllPosts(currentPage, limit);

      if (!Array.isArray(result)) {
        console.error("Received non-array result:", result);
        return;
      }

      if (currentPage > 1) {
        setPosts((prevPosts) => [...prevPosts, ...result]);
      } else {
        setPosts(result);
      }

      setHasMorePosts(result.length >= limit);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const renderFooter = () => {
    return hasMorePosts ? (
      <Pressable style={styles.button} onPress={handleLoadMore}>
        <Text style={styles.text}>Load More</Text>
      </Pressable>
    ) : null;
  };

  return (
    <View style={styles.container}>
      {posts && posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={({ item }) => <PostCard data={item} />}
          keyExtractor={(item) => item.slug}
          ListFooterComponent={renderFooter}
          style={styles.list}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  list: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
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
