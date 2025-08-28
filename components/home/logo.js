import { View, Image, useWindowDimensions } from "react-native";
import icon from "../../assets/img/logo-airbnb.png";

import { StyleSheet } from "react-native";

const LogoHome = () => {
  const { width } = useWindowDimensions();
  return (
    <View style={[style.logoWrap, { width: width }]}>
      <Image style={style.img} source={icon} resizeMode="content" />
    </View>
  );
};

export default LogoHome;

const style = StyleSheet.create({
  logoWrap: {
    // borderWidth: 3,
    // borderColor: "yellow",
    // borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
    backgroundColor: "white",
  },
  img: {
    height: 50,
    width: 150,
    backgroundColor: "white",
  },
});
