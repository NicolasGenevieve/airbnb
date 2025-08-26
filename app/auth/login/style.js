import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  keyboard: {
    // borderWidth: 3,
    // borderColor: "purple",
    // borderStyle: "solid",
    flex: 1,
  },
  keyboardContainer: {
    // borderWidth: 3,
    // borderColor: "green",
    // borderStyle: "solid",
    flex: 1,
  },

  bandeauButton: {
    // borderWidth: 3,
    // borderColor: "pink",
    // borderStyle: "solid",
    flex: 0.34,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30,
    gap: 15,
  },
  bandeauBrand: {
    // borderWidth: 3,
    // borderColor: "pink",
    // borderStyle: "solid",
    flex: 0.34,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 30,
    gap: 30,
  },
  bandeauInput: {
    // borderWidth: 3,
    // borderColor: "pink",
    // borderStyle: "solid",
    flex: 0.34,
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
});

export default styles;
