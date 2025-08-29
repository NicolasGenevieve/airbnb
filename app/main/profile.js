import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonAuth from "../../components/auth/button/button";
import { router } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Constants from "expo-constants";
import { Dimensions } from "react-native";
import InputAuth from "../../components/auth/input/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import axios from "axios";
import HomeLoading from "../../assets/img/HomeLoading.json";
import LottieView from "lottie-react-native";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

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

  const [selectedPicture, setSelectedPicture] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isInfosModified, setIsInfosModified] = useState(false);
  const [isPhotoModified, setIsPhotoModified] = useState(false);

  const onChangeUsername = (value) => {
    setUserName(value);
    setIsInfosModified(true);
  };

  const onChangeEmail = (value) => {
    setEmail(value);
    setIsInfosModified(true);
  };

  const onChangeDesc = (value) => {
    setDescription(value);
    setIsInfosModified(true);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const userId = await AsyncStorage.getItem("userId");

        if (!token || !userId) {
          alert("Pas connecté");
          return;
        }

        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("User data ===>", response.data);

        // S’il y a déjà une photo, on la met dans selectedPicture
        if (response.data.photo) {
          setSelectedPicture(response.data.photo.url);
        }
        if (response.data.username) {
          setUserName(response.data.username);
          console.log(userName);
        }
        if (response.data.email) {
          setEmail(response.data.email);
          console.log(email);
        }
        if (response.data.description) {
          setDescription(response.data.description);
          console.log(description);
        }
      } catch (error) {
        console.log("Erreur GET user :", error.response?.data || error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  const getPermissionAndGetPicture = async () => {
    //Demander le droit d'accéder à la galerie
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      //Ouvrir la galerie photo
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (result.canceled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        setSelectedPicture(result.assets[0].uri);
        setIsPhotoModified(true);
        console.log(selectedPicture);
      }
    } else {
      alert("Permission refusée");
    }
  };

  const getPermissionAndTakePicture = async () => {
    //Demander le droit d'accéder à l'appareil photo
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      //Ouvrir l'appareil photo
      const result = await ImagePicker.launchCameraAsync();

      if (result.canceled === true) {
        alert("Pas de photo sélectionnée");
      } else {
        setSelectedPicture(result.assets[0].uri);
        console.log(selectedPicture);
        setIsPhotoModified(true);
      }
    } else {
      alert("Permission refusée");
    }
  };

  const uploadPicture = async (selectedPicture) => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        alert("Pas de token, reconnecte-toi");
        return;
      }
      const formData = new FormData();
      formData.append("photo", {
        uri: selectedPicture,
        name: "profile.jpg",
      });

      const response = await axios.put(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/upload_picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Upload OK :", response.data);
      alert("Photo de profil mise à jour ✅");
    } catch (error) {
      console.log("Erreur upload :", error.response?.data || error.message);
      alert("Erreur lors de l'upload ❌");
    }
  };

  const updateUserInfos = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (!token) {
      alert("Pas connecté");
      return;
    }

    await axios.put(
      "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update",
      {
        email,
        description,
        username: userName,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const onPressUpdate = async () => {
    try {
      if (
        isPhotoModified &&
        selectedPicture &&
        selectedPicture.startsWith("file")
      ) {
        await uploadPicture(selectedPicture);
        setIsPhotoModified(false);
      }

      if (isInfosModified) {
        await updateUserInfos();
        setIsInfosModified(false);
      }

      alert("Profil mis à jour ✅");
    } catch (e) {
      console.log("Erreur update:", e.response?.data || e.message);
      alert("Une erreur est survenue ❌");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text style={styles.topTitle}>Mon Profil</Text>
      </View>
      {isLoading ? (
        <LottieView
          source={HomeLoading}
          autoPlay
          loop
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />
      ) : (
        <KeyboardAwareScrollView
          style={styles.scrollDiv}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
          extraScrollHeight={100}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.photoContainer}>
            <View style={styles.photoWrap}>
              <View style={styles.imgWrap}>
                {selectedPicture ? (
                  <Image
                    source={{ uri: selectedPicture }}
                    style={{ width: 200, height: 200, borderRadius: 100 }}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="face-man"
                    size={120}
                    color="lightgrey"
                  />
                )}
              </View>
            </View>
            <View style={styles.photoTools}>
              <TouchableOpacity
                onPress={getPermissionAndGetPicture}
                style={styles.addPhotoWrap}
              >
                <FontAwesome name="picture-o" size={35} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={getPermissionAndTakePicture}
                style={styles.takePhotoWrap}
              >
                <MaterialIcons name="add-a-photo" size={35} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.descContainer}>
            <InputAuth state={userName} setState={onChangeUsername} />
            <InputAuth state={email} setState={onChangeEmail} />
            <InputAuth
              large={true}
              multiline={true}
              state={description}
              setState={onChangeDesc}
            />
          </View>
          <View style={styles.buttonWrap}>
            <TouchableOpacity onPress={onPressUpdate} style={styles.button}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <ButtonAuth text={"Log out"} click={logout} />
          </View>
        </KeyboardAwareScrollView>
      )}
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 3,
    // borderColor: "red",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "white",
  },
  top: {
    height: screenHeight * 0.1,
    borderBottomWidth: 0.2,
    width: screenWidth * 0.8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  topTitle: {
    fontSize: 20,
    color: "#EB5A62",
    fontWeight: "bold",
  },
  scrollDiv: {
    flex: 1,
  },
  photoContainer: {
    height: screenHeight * 0.4,
    // borderWidth: 3,
    // borderColor: "red",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  photoWrap: {
    // borderWidth: 3,
    // borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "70%",
  },
  imgWrap: {
    borderWidth: 1,
    borderColor: "#EB5A62",
    justifyContent: "center",
    alignItems: "center",
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  photoTools: {
    // borderWidth: 3,
    // borderColor: "black",
    justifyContent: "center",
    alignItems: "flex-start",
    height: "100%",
    width: "30%",
    gap: 25,
    paddingHorizontal: 15,
  },
  addPhotoWrap: {
    // borderWidth: 3,
    // borderColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
  },
  takePhotoWrap: {
    // borderWidth: 3,
    // borderColor: "orange",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
  },
  descContainer: {
    // borderWidth: 3,
    // borderColor: "green",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 40,
    gap: 40,
  },
  buttonWrap: {
    // borderWidth: 3,
    // borderColor: "green",
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 50,
    gap: 20,
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#EB5A62",
    paddingHorizontal: 70,
    paddingVertical: 20,
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 25,
    color: "black",
    fontWeight: "bold",
  },
});
