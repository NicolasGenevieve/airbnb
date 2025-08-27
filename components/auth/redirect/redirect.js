import style from "./style";
import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

const RedirectAuth = ({ text, goBack, screen }) => {
  return (
    <View style={style.redirectWrap}>
      <Pressable
        onPress={() => {
          if (goBack) {
            router.back();
          } else {
            router.navigate(screen);
          }
        }}
      >
        <Text style={style.redirectText}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default RedirectAuth;
