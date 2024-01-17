import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";

import AuthForm from "../../components/auth-form";
import { TAuthCredentials } from "../../types/User";
import { SignInAPI } from "../../api/user";
import useUser from "../../hooks/useUser";

export default function SignInScreen() {
  const { mutate, loggedIn } = useUser();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useFocusEffect(() => {
    if (loggedIn) router.replace("/");
  });

  const onSignInSubmit = useCallback(
    async (data: TAuthCredentials) => {
      try {
        await SignInAPI(data);
        mutate();
        setCredentials({ email: "", password: "" });
        router.push(`/`);
      } catch (error) {
        console.error("Failed to sign in", error);
      }
    },

    [router]
  );

  return (
    <AuthForm
      credentials={credentials}
      setCredentials={setCredentials}
      postAction={onSignInSubmit}
    />
  );
}
