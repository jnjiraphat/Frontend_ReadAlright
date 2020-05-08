import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useFonts } from "@use-expo/font";

const HeaderText = (props) => {
  const { text } = props;
  return <Text style={styles.headerText}>{text}</Text>;
};

export default HeaderText;

const styles = StyleSheet.create({
  headerText: {
    // fontFamily: "PTSansCaption-Bold",
    fontSize: 24,
    fontWeight: "bold",
  },
});
