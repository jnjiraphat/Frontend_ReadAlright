import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const whiteCardStyle = StyleSheet.create({
  container: {
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
    marginVertical: 20,
    paddingVertical: 20,
  },
});

export default { whiteCardStyle };
