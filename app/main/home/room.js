import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function RoomPage() {
  const { id } = useLocalSearchParams();
  console.log(id);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur ROOM</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
