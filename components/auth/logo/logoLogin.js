import { View, Image, useWindowDimensions } from "react-native";
import style from "./styleLogin";
import logo from "../../../assets/img/logo-airbnb.png";

const LogoLogin = () => {
  const { width } = useWindowDimensions();
  return (
    <View style={[style.logoWrap, { width: width * 0.85 }]}>
      <Image style={style.img} source={logo} resizeMode="cover" />
    </View>
  );
};

export default LogoLogin;
