import { StyleSheet } from "react-native";
import { truncateString } from "./../helpers/truncateString";
import { Text, View } from "./../components/Themed";
import { Post } from "./../types/Post";
import { Link } from "expo-router";
import { useMemo } from "react";
import dayjs from "../utils/dayjs";

type PostCardProps = {
  data: Post;
};

export default function PostCard({ data }: PostCardProps) {
  const dateTime = useMemo(() => {
    return new Date(data.dateTime);
  }, [data.dateTime]);

  return (
    <View style={styles.card}>
      <Text style={styles.dateText}>
        {dayjs(dateTime).format("YYYY/MM/DD")}
      </Text>
      <Link href={`/blog/${data.slug}`} style={styles.title}>
        <Text style={styles.title}>{data.title}</Text>
      </Link>
      <Text style={styles.body}>{truncateString(data.body, 140)}</Text>
      <Link href={`/blog/${data.slug}`} style={styles.readMore}>
        <Text style={styles.readMoreText}>READ MORE</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  dateText: {
    fontSize: 12,
    fontWeight: "300",
  },
  title: {
    paddingTop: 6,
    paddingBottom: 20,
    fontSize: 30,
  },
  body: {
    fontSize: 16,
  },
  readMore: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "auto",
    paddingVertical: 12,
    paddingTop: 40,
  },
  readMoreText: {
    fontSize: 16,
    marginHorizontal: "auto",
    fontWeight: "bold",
    letterSpacing: 0.5,
    color: "white",
  },
});
