import { useState } from "react";
import { TextInput, StyleSheet, Pressable } from "react-native";

import { View, Text } from "./../components/Themed";
import { formatDate } from "./../helpers/formatDate";
import { Post } from "./../types/Post";
import { FormErrors } from "./../types/FormErrors";

type PostFormProps = {
  post: Post;
  setPost: Function;
  postAction: Function;
};

export default function PostForm({ post, setPost, postAction }: PostFormProps) {
  const [errors, setErrors] = useState<FormErrors>({
    title: "",
    slug: "",
    body: "",
  });
  const dateTime =
    post.dateTime.length > 0 ? new Date(post.dateTime) : new Date();

  const validatePost = () => {
    let isValid = true;
    setErrors({ title: "", slug: "", body: "" }); // Reset errors before validation

    if (!post.title || post.title.trim().length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        title: "Title is required",
      }));
      isValid = false;
    }

    const slugPattern = /^[a-zA-Z0-9-]+$/;
    if (!post.slug || post.slug.trim().length === 0) {
      setErrors((prevErrors) => ({ ...prevErrors, slug: "Slug is required" }));
      isValid = false;
    } else if (!slugPattern.test(post.slug)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        slug: "Slug can only contain alphabets, numbers, and hyphens",
      }));
      isValid = false;
    }

    if (!post.body || post.body.trim().length === 0) {
      setErrors((prevErrors) => ({ ...prevErrors, body: "Body is required" }));
      isValid = false;
    }

    return isValid;
  };

  const handleChange = (name: string, value: string) => {
    setPost((prevState: Post[]) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const isValid = validatePost();
    if (isValid) {
      postAction(post);
    }
  };

  return (
    <View style={styles.form}>
      <View style={[styles.wrap]}>
        <Text style={[styles.label]}>投稿日</Text>
        <Text style={[styles.input]}>{formatDate(dateTime)}</Text>
      </View>

      <View style={[styles.wrap]}>
        <Text style={[styles.label]}>タイトル</Text>
        <View>
          {errors.title.length > 0 ? (
            <Text style={styles.error}>{errors.title}</Text>
          ) : null}
        </View>
        <TextInput
          value={post.title}
          id="firstName"
          placeholder="タイトルを入力してください"
          placeholderTextColor="gray"
          style={[styles.input]}
          onChangeText={(value) => handleChange("title", value)}
        />
      </View>

      <View style={[styles.wrap]}>
        <Text style={[styles.label]}>スラッグ</Text>
        {errors.slug.length > 0 ? (
          <Text style={styles.error}>{errors.slug}</Text>
        ) : null}
        <TextInput
          placeholder="スラッグを入力してください"
          placeholderTextColor="gray"
          style={[styles.input]}
          onChangeText={(value) => handleChange("slug", value)}
          value={post.slug}
        />
      </View>

      <View style={[styles.wrap]}>
        <Text style={[styles.label]}>記事詳細</Text>
        {errors.body.length > 0 ? (
          <Text style={styles.error}>{errors.body}</Text>
        ) : null}
        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder="記事詳細を入力してください"
          placeholderTextColor="gray"
          style={[styles.input]}
          onChangeText={(value) => handleChange("body", value)}
          value={post.body}
        />
      </View>

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.text}>Save</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 20,
    fontSize: 12,
  },
  wrap: {
    marginBottom: 20,
  },
  label: {
    paddingBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    color: "white",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 12,
    fontSize: 18,
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
  error: {
    color: "red",
    fontSize: 14,
    paddingBottom: 8,
  },
});
