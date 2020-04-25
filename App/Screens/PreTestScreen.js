import React from "react";
import {
  View,
  ScrollView,
  FlatList,
  Dimensions,
  Text,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";

const PreTest = () => {
  return (
    <LinearGradient
      colors={["#FFB382", "#F07590"]}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
      }}
    >
      <ScrollView style={styles.container}>
        <View style={styles.textLayout}>
          <Text style={styles.header}>Pre-Test</Text>
          <Text style={styles.subHeader}>
            Fill the gaps with the correct word from the box.
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
export default PreTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 16,
  },
  textLayout: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});
