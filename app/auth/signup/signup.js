import { Button, View, useWindowDimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./style";
import LogoAuth from "../../../components/auth/logo/logo";
import TitleAuth from "../../../components/auth/title/title";
import InputAuth from "../../../components/auth/input/input";
import ButtonAuth from "../../../components/auth/button/button";
import RedirectAuth from "../../../components/auth/redirect/redirect";

const SignupPage = () => {
  const width = useWindowDimensions();

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
        <InputAuth placeholder="Email" />
        <InputAuth placeholder="Mot de passe" secure={true} />
      </View>
      <View style={styles.bandeauButton}>
        <ButtonAuth text="Sign In" />
        <RedirectAuth text="No account ? Register" />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignupPage;
