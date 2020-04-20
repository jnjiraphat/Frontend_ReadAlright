import React from "react";
import { Image, TouchableOpacity } from "react-native";

const Avatar = (props) => {
  const { width, source, containerStyle, height } = props;
  return (
    <TouchableOpacity
      style={{
        borderRadius: width / 2,
        marginRight: 15,
        backgroundColor: "#fff",
      }}
    >
      <Image
        source={source}
        style={{
          width: width,
          height: height,
        }}
      />
    </TouchableOpacity>
  );
};
export default Avatar;
