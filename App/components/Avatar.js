import React from "react";
import { Image, TouchableOpacity } from "react-native";

const Avatar = (props) => {
  const { size, source, containerStyle } = props;
  return (
    <TouchableOpacity style={containerStyle}>
      <Image source={source} width={size} />
    </TouchableOpacity>
  );
};
export default Avatar;
