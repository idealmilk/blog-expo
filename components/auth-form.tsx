import { View, Text } from "./themed";
import { TextInput, StyleSheet, Pressable } from "react-native";
import { TAuthCredentials } from "../types/User";
import { Link } from "expo-router";
import { useCallback } from "react";

type AuthFormProps = {
  credentials: TAuthCredentials;
  setCredentials: Function;
  isRegister?: boolean;
  postAction: Function;
};

export default function AuthForm({
  credentials,
  setCredentials,
  isRegister,
  postAction,
}: AuthFormProps) {
  const handleChange = useCallback((name: string, value: string) => {
    setCredentials((prevState: TAuthCredentials) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    postAction(credentials);
  }, []);

  return (
    <View style={styles.form}>
      {isRegister ? (
        <View style={[styles.wrap]}>
          <Text style={[styles.label]}>名前</Text>
          <TextInput
            value={credentials.name}
            id="name"
            placeholder="タイトルを入力してください"
            placeholderTextColor="gray"
            style={[styles.input]}
            onChangeText={(value) => handleChange("name", value)}
          />
        </View>
      ) : null}

      <View style={[styles.wrap]}>
        <Text style={[styles.label]}>Email</Text>

        <TextInput
          placeholder="スラッグを入力してください"
          placeholderTextColor="gray"
          style={[styles.input]}
          onChangeText={(value) => handleChange("email", value)}
          value={credentials.email}
        />
      </View>

      <View style={[styles.wrap]}>
        <Text style={[styles.label]}>Password</Text>

        <TextInput
          placeholder="記事詳細を入力してください"
          placeholderTextColor="gray"
          style={[styles.input]}
          onChangeText={(value) => handleChange("password", value)}
          value={credentials.password}
        />
      </View>

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.text}>{isRegister ? "Register" : "Sign In"}</Text>
      </Pressable>

      {isRegister ? (
        <View style={styles.alternative}>
          <Text style={styles.text}>Already have an account? </Text>
          <Link href="/signin">
            <Text style={styles.text}>Sign In</Text>
          </Link>
        </View>
      ) : (
        <View style={styles.alternative}>
          <Text style={styles.text}>Don't have an account yet </Text>
          <Link href="/register">
            <Text style={styles.text}>Register</Text>
          </Link>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 20,
    fontSize: 12,
    height: "100%",
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
  alternative: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginHorizontal: "auto",
  },
});
