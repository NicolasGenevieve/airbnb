import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { useEffect, useState } from "react";
import HomeLoading from "../../../assets/img/HomeLoading.json";
import LottieView from "lottie-react-native";
import Swiper from "react-native-swiper";
import { FontAwesome } from "@expo/vector-icons";
import { ExpandButton } from "../../../components/home/expandButton";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";

export default function RoomPage() {
  const { id } = useLocalSearchParams();
  console.log(id);

  const [roomData, setRoomData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );

        setRoomData(response.data);
        setIsLoading(false);
        // console.log(roomData.photos[0].url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading ? (
        <LottieView
          source={HomeLoading}
          autoPlay
          loop
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
      ) : (
        <>
          <View style={styles.picWrap}>
            <Swiper
              style={styles.swiper}
              showsPagination={true}
              activeDotColor="#EB5A62"
            >
              {roomData.photos?.map((photo, index) => (
                <Image
                  key={index}
                  source={{ uri: photo.url }}
                  style={styles.mainPic}
                  resizeMode="cover"
                />
              ))}
            </Swiper>
            <View style={styles.priceWrap}>
              <Text style={styles.price}>{roomData.price}€</Text>
            </View>
          </View>
          <View style={styles.desc}>
            <View style={styles.descWrite}>
              <Text style={styles.title}>{roomData.title}</Text>
              <View style={styles.starsContainer}>
                {[...Array(5)].map((_, index) => (
                  <FontAwesome
                    key={index}
                    name={index < roomData.ratingValue ? "star" : "star-o"}
                    size={16}
                    color={index < roomData.ratingValue ? "#FFD700" : "#ccc"}
                    style={{ marginRight: 4 }}
                  />
                ))}
                <Text style={styles.reviewsText}>({roomData.reviews})</Text>
              </View>
            </View>
            <View style={styles.descImg}>
              {!isLoading && roomData.user?.account?.photo?.url && (
                <Image
                  source={{ uri: roomData.user.account.photo.url }}
                  style={styles.avatar}
                />
              )}
            </View>
          </View>
          <View style={styles.desc2}>
            <ExpandButton numberOfLines={3}>
              {roomData.description}
            </ExpandButton>
          </View>
          <MapView
            style={styles.map}
            provider={
              Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
            }
            initialRegion={{
              latitude: roomData.location[1],
              longitude: roomData.location[0],
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            <Marker
              coordinate={{
                latitude: roomData.location[1],
                longitude: roomData.location[0],
              }}
              title={roomData.title}
            />
          </MapView>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 3,
    // borderColor: "red",
    // borderStyle: "solid",
  },
  picWrap: {
    height: 300,
    width: "100%",
    // borderWidth: 3,
    // borderColor: "red",
    // borderStyle: "solid",
  },
  mainPic: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },
  title: {
    fontSize: 26,
    fontWeight: 600,
  },
  starsContainer: { flexDirection: "row" },
  priceWrap: {
    position: "absolute",
    height: 50,
    width: 100,
    backgroundColor: "#EB5A62",
    borderRadius: "15%",
    bottom: 20,
    left: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  price: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  desc: {
    width: "100%",
    // height: 100,
    // borderWidth: 3,
    // borderColor: "green",
    // borderStyle: "solid",
    padding: 25,
    flexDirection: "row",
  },
  descWrite: {
    // borderWidth: 3,
    // borderColor: "black",
    // borderStyle: "solid",
    width: "70%",
    gap: 10,
  },
  descImg: {
    // borderWidth: 3,
    // borderColor: "yellow",
    // borderStyle: "solid",
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 100,
  },
  desc2: {
    width: "100%",
    // height: 100,
    // borderWidth: 3,
    // borderColor: "green",
    // borderStyle: "solid",
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: "row",
  },
  desc2Write: {
    fontSize: 16,
    lineHeight: 30,
  },
  map: {
    height: 300,
    width: "100%",
  },
});
