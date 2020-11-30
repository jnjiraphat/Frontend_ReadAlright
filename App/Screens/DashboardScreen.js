import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
        <Text>DashboardScreen</Text>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 150,
    height: 150,
  },
});
