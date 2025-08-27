import style from "./style";
import { Pressable, Text, View, TouchableOpacity } from "react-native";

const ButtonAuth = ({ text, click, disabled }) => {
  return (
    <View style={style.buttonWrap}>
      <TouchableOpacity
        style={style.button}
        onPress={click}
        disabled={disabled}
      >
        <Text style={style.buttonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonAuth;
