import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";

import Colors from "./../../constants/Colors";
import useUser from "../../hooks/useUser";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { mutate, loggedIn } = useUser();
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="new-post"
        options={{
          title: "New Post",
          tabBarIcon: ({ color }) => <TabBarIcon name="pencil" color={color} />,
          href: loggedIn ? "/new-post" : null,
        }}
      />

      <Tabs.Screen
        name="admin"
        options={{
          title: "Admin",
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
          href: loggedIn ? "/admin" : null,
        }}
      />

      <Tabs.Screen
        name="signin"
        options={{
          title: "Sign In",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          href: !loggedIn ? "/signin" : null,
        }}
      />

      <Tabs.Screen
        name="logout"
        options={{
          title: "Log Out",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="sign-out" color={color} />
          ),
          href: loggedIn ? "/logout" : null,
        }}
      />
    </Tabs>
  );
}
