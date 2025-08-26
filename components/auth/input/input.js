import { View, TextInput } from "react-native";
import style from "./style";

const InputAuth = ({ placeholder, keyboardType, secure }) => {
  return (
    <View style={style.inputWrap}>
      <TextInput
        style={style.inputAuth}
        placeholder={placeholder}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        autoCapitalize="none"
      />
    </View>
  );
};

export default InputAuth;
