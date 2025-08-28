import {
  View,
  Text,
  Platform,
  Button,
  Linking,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import MapView, {
  Marker,
  Callout,
  CalloutSubview,
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import LottieView from "lottie-react-native";
import * as Location from "expo-location";
import { useState, useCallback, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { useRouter } from "expo-router";

import HomeLoading from "../../assets/img/HomeLoading.json";

const MapPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [rooms, setRooms] = useState([]);

  const router = useRouter();

  // 🔹 Étape 1 : Demander la permission de localisation
  useFocusEffect(
    useCallback(() => {
      const askPermission = async () => {
        try {
          const { status, canAskAgain } =
            await Location.getForegroundPermissionsAsync();

          if (status === "granted") {
            const location = await Location.getCurrentPositionAsync({});
            setCoords({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
            setError(null);
          } else if (canAskAgain) {
            const { status: newStatus } =
              await Location.requestForegroundPermissionsAsync();
            if (newStatus === "granted") {
              const location = await Location.getCurrentPositionAsync({});
              setCoords({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              });
              setError(null);
            } else {
              setError("refused");
            }
          } else {
            setError("blocked");
          }
        } catch {
          setError("unknown");
        } finally {
          setIsLoading(false);
        }
      };

      askPermission();
    }, [])
  );

  // 🔹 Étape 2 : Charger les appartements autour (ou fallback Paris)
  useEffect(() => {
    if (coords) {
      const fetchRooms = async () => {
        try {
          let response = await axios.get(
            `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${coords.latitude}&longitude=${coords.longitude}`
          );

          if (response.data.length === 0) {
            // fallback sur Paris
            response = await axios.get(
              `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=48.8566&longitude=2.3522`
            );
          }

          setRooms(response.data);
        } catch (e) {
          console.log("Erreur API :", e.message);
        }
      };

      fetchRooms();
    }
  }, [coords]);

  // 🔹 Affichage
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? (
        <LottieView
          source={HomeLoading}
          autoPlay
          loop
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
      ) : error === "blocked" ? (
        <View style={{ padding: 20 }}>
          <Text style={{ marginBottom: 10 }}>
            Vous avez refusé l'accès à la localisation. Pour l'activer, allez
            dans les réglages iOS.
          </Text>
          <Button
            title="Ouvrir les réglages"
            onPress={() => Linking.openSettings()}
          />
        </View>
      ) : error === "refused" ? (
        <View style={{ padding: 20 }}>
          <Text>Vous avez refusé l'accès à la localisation.</Text>
        </View>
      ) : (
        <MapView
          style={{ flex: 1 }}
          provider={
            Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
          }
          initialRegion={{
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {/* 📍 Marqueur utilisateur */}
          <Marker
            coordinate={{
              latitude: coords.latitude,
              longitude: coords.longitude,
            }}
            title="Vous êtes ici"
            pinColor="blue"
          />

          {/* 🏠 Marqueurs des appartements */}
          {rooms.map((room) => (
            <Marker
              key={room._id}
              coordinate={{
                latitude: room.location[1],
                longitude: room.location[0],
              }}
            >
              {/* Icône custom du marker */}
              <View
                style={{
                  backgroundColor: "#EB5A62",
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 20,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {room.price} €
                </Text>
              </View>

              {/* Callout avec bouton */}
              <Callout tooltip>
                <View
                  style={{
                    width: 230,
                    backgroundColor: "white",
                    borderRadius: 14,
                    padding: 10,
                    // ombre iOS/Android
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.15,
                    shadowRadius: 6,
                    elevation: 4,
                  }}
                >
                  {/* Image */}
                  <Image
                    source={{ uri: room.photos[0].url }}
                    style={{
                      width: "100%",
                      height: 110,
                      borderRadius: 10,
                      marginBottom: 8,
                    }}
                    resizeMode="cover"
                  />

                  {/* Titre */}
                  <Text
                    style={{ fontWeight: "700", marginBottom: 4 }}
                    numberOfLines={1}
                  >
                    {room.title}
                  </Text>

                  {/* Ligne prix + bouton, côte à côte */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        height: 32,
                        borderRadius: 16,
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ color: "#EB5A62", fontWeight: "700" }}>
                        {room.price}€ / nuit
                      </Text>
                    </View>

                    {/* Bouton cliquable dans un Callout */}
                    <CalloutSubview
                      onPress={() => router.push(`/main/home/${room._id}`)}
                      style={{
                        height: 32,
                        justifyContent: "center",
                        marginRight: 5,
                      }}
                    >
                      <Text style={{ color: "black", fontWeight: "700" }}>
                        Voir l’offre
                      </Text>
                    </CalloutSubview>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
    </SafeAreaView>
  );
};

export default MapPage;
