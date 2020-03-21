import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Interest from "./App/Screens/InterestScreen";

export default function App() {
  return <Interest />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
