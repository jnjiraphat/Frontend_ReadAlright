import React from "react";
import { View, StyleSheet, Image } from "react-native";
import Constants from "expo-constants";
import Loader from "../assets/icon.png";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
        <Image source={Loader} style={styles.img} />
    </View>
  );
};

export default LoadingScreen;

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
