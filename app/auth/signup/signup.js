import {
  Text,
  View,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./style";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import LogoAuth from "../../../components/auth/logo/logo";
import TitleAuth from "../../../components/auth/title/title";
import InputAuth from "../../../components/auth/input/input";
import ButtonAuth from "../../../components/auth/button/button";
import RedirectAuth from "../../../components/auth/redirect/redirect";
import axios from "axios";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [secure, setSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  const { width } = useWindowDimensions();

  const passMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const signupSubmit = async () => {
    setError("");
    if (!email || !username || !description || !password || !confirmPassword) {
      setError("Tous les champs doivent être remplis !");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        { email, username, description, password }
      );
      console.log("OK", response.data);
    } catch (error) {
      // console.error(error.response.data.error);
      if (error.response.data.error === "Missing parameter(s)") {
        setError("Tous les champs doivent être remplis !");
      } else if (
        error.response.data.error === "This username already has an account."
      ) {
        setError("Ce nom d'utilisateur existe déjà ! Connectez-vous");
      } else if (
        error.response.data.error === "This email already has an account."
      ) {
        setError("Cet email existe déjà ! Connectez-vous");
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
        <TitleAuth title="Sign Up" />
      </View>
      <View style={[styles.bandeauInput, { width }]}>
        <InputAuth placeholder="Email" state={email} setState={setEmail} />
        <InputAuth
          placeholder="Username"
          state={username}
          setState={setUsername}
        />
        <InputAuth
          placeholder="Description"
          state={description}
          setState={setDescription}
          large={true}
          multiline={true}
        />
        <InputAuth
          placeholder="Mot de passe"
          state={password}
          setState={setPassword}
          secure={secure}
        />
        <InputAuth
          placeholder="Confirmer votre mot de passe"
          state={confirmPassword}
          setState={setConfirmPassword}
          secure={secure}
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
          <ButtonAuth
            text="Sign Up"
            click={signupSubmit}
            disabled={!passMatch}
          />
        )}
        <RedirectAuth text="Already have an account ? Login !" goBack={true} />
        {password.length > 0 && confirmPassword.length > 0 && !passMatch && (
          <Text style={{ color: "red", marginTop: 8 }}>
            Les mots de passe ne correspondent pas
          </Text>
        )}
        {error ? (
          <Text style={{ color: "red", marginTop: 8 }}>{error}</Text>
        ) : (
          <></>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignupPage;
