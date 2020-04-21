import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ButtonClick = (props) => {
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
    text,
    marginBottom,
    marginTop,
  } = props;
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: marginBottom,
        marginTop: marginTop,
      }}
    >
      <TouchableOpacity
        onPress={onPressAction}
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
        }}
      >
        <LinearGradient
          colors={[colorsStart, colorsEnd]}
          style={{
            padding: padding,
            alignItems: "center",
            borderRadius: radius,
            height: height,
            width: width,
          }}
        >
          <Text
            style={{
              fontSize: fontSize,
              fontWeight: fontWeight,
              color: fontcolor,
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
