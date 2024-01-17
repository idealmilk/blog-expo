import { useFocusEffect } from "expo-router";

import { Text } from "../../components/themed";
import { LogoutAPI } from "../../api/user";
import { router } from "expo-router";
import useUser from "../../hooks/useUser";
import { useCallback } from "react";

export default function LogOutScreen() {
  const { mutate } = useUser();

  const handleLogout = useCallback(async () => {
    try {
      await LogoutAPI();
      mutate();
      router.replace("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, []);

  useFocusEffect(() => {
    handleLogout();
  });

  return <Text>Redirecting....</Text>;
}
