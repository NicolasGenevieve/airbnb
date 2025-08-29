import { Slot, router } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RootLayout = () => {
  useEffect(() => {
    const fetchData = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const userToken = await AsyncStorage.getItem("userToken");

      console.log(userId);
      console.log(userToken);

      if (userId !== null && userToken !== null) {
        router.replace("/main/home");
      } else {
        router.replace("auth/login/login");
      }
    };

    fetchData();
  }, []);

  return <Slot />;
};

export default RootLayout;
