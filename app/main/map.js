import { View, Text, Platform } from "react-native";
import { SafeAreaView } from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import axios from "axios";
import HomeLoading from "../../assets/img/HomeLoading.json";
import LottieView from "lottie-react-native";
import { useState, useEffect } from "react";

const MapPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mapData, setMapData] = useState();

  useEffect(() => {
    const getlocationInfo = async () => {
      try {
      } catch (error) {
        alert("An error occurred");
      }
    };
  });

  return (
    <SafeAreaView>
      <Text>Map Page</Text>
    </SafeAreaView>
  );
};

export default MapPage;
