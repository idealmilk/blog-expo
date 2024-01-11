import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Link } from "expo-router";

import { LoadPosts } from "../../helpers/loadPosts";
import { Text, View } from "../../components/Themed";
import { Post } from "../../types/Post";
import IconButton from "../../components/IconButton";
import { formatDate } from "../../helpers/formatDate";
import axios from "axios";

export default function AdminScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  useEffect(() => {
    LoadPosts(setPosts, currentPage, setHasMorePosts);
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const deletePost = async (slug: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/posts/${slug}`);
      console.log("Post deleted successfully");
      setPosts((posts) => posts.filter((post) => post.slug !== slug));
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  return (
    <View style={styles.container}>
      {posts && posts.length > 0 && (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <View>
                <Text>{formatDate(new Date(item.dateTime))}</Text>
                <Link href={`/blog/${item.slug}`}>
                  <Text>{item.title}</Text>
                </Link>
              </View>

              <View style={styles.icons}>
                <IconButton icon="edit" onPress={() => alert("Clicked")} />

                <IconButton
                  icon="delete"
                  onPress={() => deletePost(item.slug)}
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.slug}
          style={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 20, width: "80%", marginHorizontal: "auto" },
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
});
