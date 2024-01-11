import { FlatList, StyleSheet } from "react-native";
import { LoadPosts } from "../../helpers/loadPosts";

import { View } from "../../components/Themed";
import { useEffect, useState } from "react";
import { Post } from "../../types/Post";
import PostCard from "../../components/PostCard";

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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
