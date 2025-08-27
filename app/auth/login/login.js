import {
  Text,
  View,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import styles from "./style";
import AntDesign from "@expo/vector-icons/AntDesign";
import LogoAuth from "../../../components/auth/logo/logo";
import TitleAuth from "../../../components/auth/title/title";
import InputAuth from "../../../components/auth/input/input";
import ButtonAuth from "../../../components/auth/button/button";
import RedirectAuth from "../../../components/auth/redirect/redirect";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // console.log(email);
  // console.log(password);

  const { width } = useWindowDimensions();

  const loginSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        { email, password }
      );
      //console.log("OK ========>", response);
      await AsyncStorage.setItem("userId", response.data.id);
      await AsyncStorage.setItem("userToken", response.data.token);
      router.replace("/main/home");
    } catch (error) {
      //console.error(error.response.data.error);
      if (error.response.data.error === "Missing parameter(s)") {
        setError("Tous les champs doivent être remplis !");
      } else if (error.response.data.error === "This account doesn't exist !") {
        setError("Ce compte n'existe pas !");
      } else {
        setError("Une erreur s'est produite veuillez réessayer");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.keyboard}
      contentContainerStyle={styles.keyboardContainer}
    >
      <View style={[styles.bandeauBrand, { width }]}>
        <LogoAuth />
        <TitleAuth title="Sign In" />
      </View>
      <View style={[styles.bandeauInput, { width }]}>
        <InputAuth placeholder="Email" state={email} setState={setEmail} />
        <InputAuth
          placeholder="Mot de passe"
          secure={secure}
          state={password}
          setState={setPassword}
        />
        <AntDesign
          style={styles.eye}
          onPress={() => {
            setSecure(!secure);
          }}
          name={secure ? "eye" : "eyeo"}
          size={30}
          color="grey"
        />
      </View>
      <View style={styles.bandeauButton}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <ButtonAuth text="Sign In" click={loginSubmit} />
        )}

        <RedirectAuth
          text="No account ? Register !"
          screen={"auth/signup/signup"}
        />
        {error ? (
          <Text style={{ color: "red", marginTop: 8 }}>{error}</Text>
        ) : (
          <></>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginPage;
