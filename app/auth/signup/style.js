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
    justifyContent: "center",
    paddingTop: 30,
    gap: 15,
  },
  bandeauBrand: {
    // borderWidth: 3,
    // borderColor: "pink",
    // borderStyle: "solid",
    flex: 0.34,
    alignItems: "center",
    justifyContent: "center",
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
  eye: {
    position: "absolute",
    top: "75%",
    right: "10%",
  },
});

export default styles;
