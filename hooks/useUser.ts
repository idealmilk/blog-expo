import useSWR from "swr";
import { GetUserAPI } from "../api/user";

export default function useUser() {
  const { data, mutate, isLoading, error } = useSWR("user", GetUserAPI);

  console.log("error: ", error);
  console.log("data: ", data);

  const loggedIn = data && !("error" in data);

  return {
    isLoading,
    loggedIn,
    user: data,
    mutate,
  };
}
