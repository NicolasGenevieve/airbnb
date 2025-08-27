import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import LogoHome from "../../../components/home/logo";
import axios from "axios";

export default function HomePage() {
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );

        setHomeData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <LogoHome />
      <FlatList
        data={homeData}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                router.navigate({
                  pathname: "/main/home/room",
                  params: { id: item._id },
                });
              }}
            >
              <Image
                source={{ uri: item.photos[0].url }}
                style={styles.roomPic}
              />
              <Text>{item.title}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  roomPic: {
    height: 150,
    width: "100%",
  },
});
