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
import HeaderText from "../components/HeaderText";
import WhiteCard from "../components/WhiteCard";
// import { useFonts } from "@use-expo/font";

const PreTest = () => {
  function ContentDefault() {
    return (
      <View>
        <Text>Yes</Text>
        <Text>Yes</Text>
        <Text>Yes</Text>
        <Text>Yes</Text>
        <Text>Yes</Text>
        <Text>Yes</Text>
        <Text>Yes</Text>
      </View>
    );
  }
  // let [fontsLoaded] = useFonts({
  //   // "PTSansCaption-Regular": require("../assets/font/PTSansCaption-Regular.ttf"),
  //   "PTSansCaption-Bold": require("../assets/font/PTSansCaption-Bold.ttf"),
  // });
  // if (!fontsLoaded) {
  //   return console.log("Font not load");
  // } else {
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
          <HeaderText text="Pre-Test" />
          <Text style={styles.subHeader}>
            Fill the gaps with the correct word from the box.
          </Text>
          <WhiteCard ContentDefault={ContentDefault()} />
          <WhiteCard ContentDefault={ContentDefault()} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
  // }
};
export default PreTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  // header: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  // },
  subHeader: {
    fontSize: 16,
    // fontFamily: "PTSansCaption-Bold",
  },
  textLayout: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
});
