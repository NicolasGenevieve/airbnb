import style from "./style";
import { Pressable, Text, View } from "react-native";

const ButtonAuth = ({ text, click }) => {
  return (
    <View style={style.buttonWrap}>
      <Pressable style={style.button} onPress={click}>
        <Text style={style.buttonText}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default ButtonAuth;
