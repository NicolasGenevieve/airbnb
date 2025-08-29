import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  keyboard: {
    // borderWidth: 3,
    // borderColor: "purple",
    // borderStyle: "solid",
    flex: 1,
    backgroundColor: "white",
  },
  keyboardContainer: {
    // borderWidth: 3,
    // borderColor: "green",
    // borderStyle: "solid",
    flex: 1,
    backgroundColor: "white",
    flexGrow: 1,
  },

  bandeauButton: {
    // borderWidth: 3,
    // borderColor: "pink",
    // borderStyle: "solid",
    flex: 0.34,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    gap: 15,
  },
  bandeauBrand: {
    // borderWidth: 3,
    // borderColor: "pink",
    // borderStyle: "solid",
    height: screenHeight * 0.2,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 0,
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
    top: "67%",
    right: "10%",
  },
});

export default styles;
