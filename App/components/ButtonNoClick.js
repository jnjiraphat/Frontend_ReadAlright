import React from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ButtonClick = (props) => {
  const {
    colorsStart,
    colorsEnd,
    padding,
    radius,
    height,
    width,
    fontSize,
    fontcolor,
    text,
    buttonStyle,
  } = props;
  return (
    <View style={{ justifyContent: "center" }}>
      <LinearGradient
        colors={[colorsStart, colorsEnd]}
        style={{
          padding: padding,
          alignItems: "center",
          borderRadius: radius,
          height: height,
          width: width,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowRadius: 4.65,
          shadowColor: "#000000",
          shadowOpacity: 0.3,
          elevation: 8,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: fontSize,
            color: fontcolor,
            fontFamily: "PT-Bold",
          }}
        >
          {text}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default ButtonClick;
