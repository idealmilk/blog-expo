import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";

import AuthForm from "../components/auth-form";
import { RegisterAPI } from "../api/user";
import useUser from "../hooks/useUser";
import { TUser } from "../types/User";

export default function RegisterScreen() {
  const { mutate, loggedIn } = useUser();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  useFocusEffect(
    useCallback(() => {
      if (loggedIn) router.replace("/");
    }, [loggedIn])
  );

  const onRegisterSubmit = useCallback(
    async (data: TUser) => {
      try {
        await RegisterAPI(data);
        mutate();
        router.replace(`/`);
      } catch (error) {
        console.error("Failed to create post", error);
      }
    },
    [router]
  );

  return (
    <AuthForm
      isRegister={true}
      credentials={credentials}
      setCredentials={setCredentials}
      postAction={onRegisterSubmit}
    />
  );
}
