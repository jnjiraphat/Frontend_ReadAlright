import React from "react";
import { StyleSheet, Text } from "react-native";

const HeaderText = (props) => {
  const { text } = props;
  return <Text style={styles.headerText}>{text}</Text>;
};

export default HeaderText;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
