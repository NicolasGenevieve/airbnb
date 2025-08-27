import { Stack } from "expo-router";
import { Platform } from "react-native";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: {
            height: 0,
          },
          shadowColor: "transparent",
        },
        headerShadowVisible: false,
        headerTintColor: "#333",
        headerTitle: "",
      }}
    />
  );
};

export default Layout;
