import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ButtonClick = props => {
  const {
    onPressAction,
    colorsStart,
    colorsEnd,
    padding,
    radius,
    height,
    width,
    fontSize,
    fontWeight,
    fontcolor,
    text
    // shadowRadius
  } = props;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={onPressAction} style={styles.button}>
        <LinearGradient
          colors={[colorsStart, colorsEnd]}
          style={{
            padding: padding,
            alignItems: "center",
            borderRadius: radius,
            height: height,
            width: width
          }}
        >
          <Text
            style={{
              fontSize: fontSize,
              fontWeight: fontWeight,
              color: fontcolor
            }}
          >
            {text}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonClick;

const styles = StyleSheet.create({
  button: {
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8
  }
});
