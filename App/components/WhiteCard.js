import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const WhiteCard = (props) => {
  const { ContentDefault } = props;
  return <View style={styles.container}>{ContentDefault}</View>;
};

export default WhiteCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("window").width / 1.15,
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
    // marginBottom: 10,
    marginVertical: 20,
    paddingVertical: 20,
  },
});
