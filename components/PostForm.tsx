import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput } from "react-native";
import { View, Text } from "./Themed";
import { Post } from "../types/Post";
import { formatDate } from "../helpers/formatDate";

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
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      title: post?.title ? post.title : "",
      slug: post?.slug ? post.slug : "",
      body: post?.body ? post.body : "",
    },
  });

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => postAction(data);

  return (
    <View>
      <Text>タイトル</Text>
      <View>
        <TextInput
          id="firstName"
          placeholder="タイトルを入力してください"
          {...register("title")}
        />
      </View>

      <View>
        <Text>投稿日</Text>
        <Text>{formatDate(dateTime)}</Text>
      </View>

      <View className="pb-6">
        <Text className="text-gray-400 pb-6">スラッグ</Text>
        <TextInput {...register("slug")} />
      </View>

      <View>
        <Text className="text-gray-400 pb-6">記事詳細</Text>
        <TextInput multiline={true} numberOfLines={4} {...register("body")} />
      </View>
      <View>
        <Button title="Save" onPress={() => handleSubmit(onSubmit)} />
      </View>
    </View>
  );
}
