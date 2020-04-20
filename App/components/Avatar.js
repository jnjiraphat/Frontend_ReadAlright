import React from "react";
import { Image, TouchableOpacity, Dimensions } from "react-native";

const Avatar = (props) => {
  const { width, source, containerStyle, height } = props;
  return (
    <TouchableOpacity style={containerStyle}>
      <Image
        source={source}
        style={{
          width: width,
          height: height,
          borderRadius: width / 2,
        }}
      />
    </TouchableOpacity>
  );
};
export default Avatar;
