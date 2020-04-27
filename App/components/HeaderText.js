import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useFonts } from "@use-expo/font";

// function useFonts(fontMap) {
//   let [fontsLoaded, setFontsLoaded] = useState(false);
//   // (async () => {
//   //   await Font.loadAsync(fontMap);
//   //   setFontsLoaded(true);
//   // })();
//   return [fontsLoaded];
// }

const HeaderText = (props) => {
  const { text } = props;
  // let [fontsLoaded] = useFonts({
  //   // "PTSansCaption-Regular": require("../assets/font/PTSansCaption-Regular.ttf"),
  //   "PTSansCaption-Bold": require("../assets/font/PTSansCaption-Bold.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return console.log("Font not load");
  // } else {
  return <Text style={styles.headerText}>{text}</Text>;
  // }
};

export default HeaderText;

const styles = StyleSheet.create({
  headerText: {
    // fontFamily: "PTSansCaption-Bold",
    fontSize: 24,
    fontWeight: "bold",
  },
});
