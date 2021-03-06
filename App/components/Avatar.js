import React from "react";
import { Image, TouchableOpacity } from "react-native";

const Avatar = (props) => {
  const { width, source, height } = props;
  return (
    <TouchableOpacity
      style={{
        borderRadius: width / 2,
        marginRight: 15,
        width: width,
        height: width,
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={{ uri: source }}
        style={{
          width: width,
          height: height,
          resizeMode: "contain",
        }}
      />
    </TouchableOpacity>
  );
};
export default Avatar;
