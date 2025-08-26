import style from "./style";
import { Pressable, Text, View } from "react-native";

const RedirectAuth = ({ text, click }) => {
  return (
    <View style={style.redirectWrap}>
      <Pressable onPress={click}>
        <Text style={style.redirectText}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default RedirectAuth;
