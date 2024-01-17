import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import { Link, router, useFocusEffect } from "expo-router";

import { Text, View } from "../../components/themed";
import { TPost } from "../../types/Post";
import IconButton from "../../components/icon-button";
import axios from "axios";
import { ReadAllPosts } from "../../api/posts";
import dayjs from "../../utils/dayjs";
import useUser from "../../hooks/useUser";

export default function AdminScreen() {
  const { loggedIn } = useUser();
  const [posts, setPosts] = useState<TPost[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const limit = 10;

  useFocusEffect(
    useCallback(() => {
      if (!loggedIn) router.replace("/");
    }, [loggedIn])
  );

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

  const deletePost = async (slug: string) => {
    try {
      await axios.delete(`http://192.168.1.21:4000/api/posts/${slug}`);
      console.log("Post deleted successfully");
      setPosts((posts) => posts.filter((post) => post.slug !== slug));
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  return (
    <View style={styles.container}>
      {posts && posts.length > 0 ? (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Text>{dayjs(item.dateTime).format("YYYY/MM/DD")}</Text>
                <Link href={`/blog/${item.slug}`}>
                  <Text>{item.title}</Text>
                </Link>
              </View>

              <View style={styles.icons}>
                <IconButton
                  icon="edit"
                  onPress={() => router.push(`/edit/${item.slug}`)}
                />

                <IconButton
                  icon="delete"
                  onPress={() => deletePost(item.slug)}
                />
              </View>
            </View>
          )}
          // keyExtractor={(item) => item.slug}
          style={styles.list}
        />
      ) : null}

      {hasMorePosts ? (
        <Pressable style={styles.button} onPress={handleLoadMore}>
          <Text style={styles.text}>Load More</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, height: "100%" },
  list: {},
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
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
