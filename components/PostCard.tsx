import { StyleSheet } from "react-native";
import { formatDate } from "./../helpers/formatDate";
import { truncateString } from "./../helpers/truncateString";
import { Text, View } from "./../components/Themed";
import { Post } from "./../types/Post";
import { Link } from "expo-router";

type PostCardProps = {
  data: Post;
};

export default function PostCard({ data }: PostCardProps) {
  const dateTime = new Date(data.dateTime);
  return (
    <View style={styles.card}>
      <Text style={styles.dateText}>{formatDate(dateTime)}</Text>
      <Link href={`/blog/${data.slug}`}>
        <Text style={styles.title}>{data.title}</Text>
      </Link>
      <Text style={styles.body}>{truncateString(data.body, 140)}</Text>
      <Link href={`/blog/${data.slug}`} style={styles.readMore}>
        <Text style={styles.readMore}>READ MORE</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  dateText: {
    fontSize: 12,
    fontWeight: "300",
  },
  title: {
    fontSize: 24,
    paddingTop: 60,
  },
  body: {
    fontSize: 16,
  },
  readMore: {
    paddingTop: 4,
    color: "blue",
  },
});
