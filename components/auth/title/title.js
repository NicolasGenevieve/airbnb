import { View, Text } from "react-native";
import style from "./style";

const TitleAuth = ({ title }) => {
  return (
    <View style={style.titleWrap}>
      <Text style={style.title}>{title}</Text>
    </View>
  );
};

export default TitleAuth;
