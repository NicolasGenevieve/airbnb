import { View, Text } from "react-native";
import { SafeAreaView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonAuth from "../../components/auth/button/button";
import { router } from "expo-router";

const ProfilePage = () => {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      await AsyncStorage.removeItem("userToken");
      router.replace("/auth/login/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <Text>Profile Page</Text>
      <ButtonAuth text={"Log out"} click={logout} />
    </SafeAreaView>
  );
};

export default ProfilePage;
