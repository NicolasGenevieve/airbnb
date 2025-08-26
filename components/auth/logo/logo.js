import { View, Image, useWindowDimensions } from "react-native";
import style from "./style";
import logo from "../../../assets/img/logo-airbnb.png";

const LogoAuth = () => {
  const { width } = useWindowDimensions();
  return (
    <View style={[style.logoWrap, { width: width * 0.7 }]}>
      <Image style={style.img} source={logo} resizeMode="cover" />
    </View>
  );
};

export default LogoAuth;
