import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import HomeLoading from "../../../assets/img/HomeLoading.json";
import LogoHome from "../../../components/home/logo";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

export default function HomePage() {
  const [homeData, setHomeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );

        setHomeData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <LogoHome />
      <View style={styles.container}>
        {isLoading ? (
          <LottieView
            source={HomeLoading}
            autoPlay
            loop
            style={{ width: 200, height: 200, alignSelf: "center" }}
          />
        ) : (
          <FlatList
            ItemSeparatorComponent={() => <View style={{ height: 30 }} />}
            data={homeData}
            renderItem={({ item }) => {
              return (
                <Pressable
                  style={styles.card}
                  onPress={() => {
                    router.push(`/main/home/${item._id}`);
                  }}
                >
                  <View style={styles.picWrap}>
                    <Image
                      source={{ uri: item.photos[0].url }}
                      style={styles.roomPic}
                    />
                    <View style={styles.priceWrap}>
                      <Text style={styles.price}>{item.price}€</Text>
                    </View>
                  </View>
                  <View style={styles.desc}>
                    <View style={styles.descWrite}>
                      <Text
                        style={styles.title}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.title}
                      </Text>
                      <View style={styles.starsContainer}>
                        {[...Array(5)].map((_, index) => (
                          <FontAwesome
                            key={index}
                            name={index < item.ratingValue ? "star" : "star-o"}
                            size={16}
                            color={
                              index < item.ratingValue ? "#FFD700" : "#ccc"
                            }
                            style={{ marginRight: 4 }}
                          />
                        ))}
                        <Text style={styles.reviewsText}>({item.reviews})</Text>
                      </View>
                    </View>
                    <View style={styles.descImg}>
                      <Image
                        source={{ uri: item.user.account.photo.url }}
                        style={styles.userPic}
                      />
                    </View>
                  </View>
                </Pressable>
              );
            }}
            ListFooterComponent={
              <View style={styles.footer}>
                <Text> Made by </Text>
                <Text style={{ fontWeight: "bold" }}>Nico</Text>
                <Text> at </Text>
                <Text style={{ fontWeight: "bold" }}>Le Reacteur</Text>
              </View>
            }
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingVertical: 30,
    backgroundColor: "white",
    // borderWidth: 3,
    // borderColor: "red",
    // borderStyle: "solid",
  },
  cardWrap: {
    // borderWidth: 3,
    // borderColor: "green",
    // borderStyle: "solid",
  },
  card: {
    // borderWidth: 3,
    // borderColor: "red",
    // borderStyle: "solid",
    borderBottomColor: "grey",
    borderBottomWidth: 0.2,
    height: 280,
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
  },
  picWrap: {
    position: "relative",
  },
  priceWrap: {
    position: "absolute",
    height: 40,
    width: 80,
    backgroundColor: "#EB5A62",
    borderRadius: "15%",
    bottom: 10,
    left: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  roomPic: {
    height: 180,
    width: "100%",
  },
  desc: {
    height: 80,
    // borderWidth: 3,
    // borderColor: "blue",
    // borderStyle: "solid",
    padding: 10,
    flexDirection: "row",
  },
  descWrite: {
    // borderWidth: 3,
    // borderColor: "black",
    // borderStyle: "solid",
    width: "75%",
    justifyContent: "space-around",
  },
  starsContainer: { flexDirection: "row" },
  descImg: {
    // borderWidth: 3,
    // borderColor: "yellow",
    // borderStyle: "solid",
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  userPic: {
    height: 50,
    width: 50,
    borderRadius: "50%",
  },
  footer: {
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
