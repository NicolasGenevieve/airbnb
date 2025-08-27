import { View, TextInput } from "react-native";
import style from "./style";

const InputAuth = ({
  placeholder,
  secure,
  state,
  setState,
  large,
  multiline,
}) => {
  return (
    <View style={style.inputWrap}>
      <TextInput
        style={large ? style.inputAuthLarge : style.inputAuth}
        placeholder={placeholder}
        secureTextEntry={secure}
        autoCapitalize="none"
        value={state}
        onChangeText={setState}
        multiline={multiline}
      />
    </View>
  );
};

export default InputAuth;
