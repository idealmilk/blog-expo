import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput, StyleSheet, Pressable } from "react-native";
import { View, Text } from "./Themed";
import { Post } from "../types/Post";
import { formatDate } from "../helpers/formatDate";
import { useEffect } from "react";

type PostFormProps = {
  post?: Post;
  postAction: Function;
};

export default function PostForm({ post, postAction }: PostFormProps) {
  const dateTime = post ? new Date(post.dateTime) : new Date();

  const validationSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    slug: z.string().min(1, { message: "Slug is required" }),
    body: z.string().min(1, { message: "Body is required" }),
  });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: post?.title ? post.title : "",
      slug: post?.slug ? post.slug : "",
      body: post?.body ? post.body : "",
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    // const onSubmit: SubmitHandler<ValidationSchema> = (data) => postAction(data);

    console.log("Creatin");
  };

  const onInvalid = (errors: any) => console.error(errors);

  return (
    <View style={styles.form}>
      <View style={[styles.wrap]}>
        <Text style={[styles.label]}>投稿日</Text>
        <Text style={[styles.input]}>{formatDate(dateTime)}</Text>
      </View>

      <View style={[styles.wrap]}>
        <Text style={[styles.label]}>タイトル</Text>
        <TextInput
          {...register("title")}
          id="firstName"
          placeholder="タイトルを入力してください"
          placeholderTextColor="gray"
          style={[styles.input, errors.title && { borderColor: "red" }]}
          onChangeText={(text) =>
            setValue("title", text, { shouldValidate: true })
          }
          value={watch("title")}
        />
        {errors.title && (
          <Text style={styles.error}>{errors.title.message || "Error"}</Text>
        )}
      </View>

      <View style={[styles.wrap]}>
        <Text style={[styles.label]}>スラッグ</Text>
        <TextInput
          {...register("slug")}
          placeholder="スラッグを入力してください"
          placeholderTextColor="gray"
          style={[styles.input, errors.slug && { borderColor: "red" }]}
          onChangeText={(text) =>
            setValue("slug", text, { shouldValidate: true })
          }
          value={watch("slug")}
        />
        {errors.slug && (
          <Text style={styles.error}>{errors.slug.message || "Error"}</Text>
        )}
      </View>

      <View style={[styles.wrap]}>
        <Text style={[styles.label]}>記事詳細</Text>
        <TextInput
          {...register("body")}
          multiline={true}
          numberOfLines={4}
          placeholder="記事詳細を入力してください"
          placeholderTextColor="gray"
          style={[styles.input, errors.body && { borderColor: "red" }]}
          onChangeText={(text) =>
            setValue("body", text, { shouldValidate: true })
          }
          value={watch("body")}
        />
        {errors.body && (
          <Text style={styles.error}>{errors.body.message || "Error"}</Text>
        )}
      </View>

      <Pressable
        style={styles.button}
        onPress={() => handleSubmit(onSubmit, onInvalid)}
      >
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
  },
});
