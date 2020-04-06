import React from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ListItem } from "react-native-elements";
import { Avatar } from "react-native-elements";
import LevelLabel from "../components/LevelLabel";
import { Button } from "@ant-design/react-native";

const Header = (props) => {
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
  } = props;
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <LinearGradient
        colors={["#FFB382", "#F07590"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 250,
          width: Dimensions.get("window").width,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      />
      <Avatar
        rounded
        source={{
          uri: "https://randomuser.me/api/portraits/men/41.jpg",
        }}
        size="large"
        containerStyle={{
          marginLeft: 25,
          marginTop: 25,
          width: 124.2,
          height: 114.43,
        }}
      />
      <LevelLabel></LevelLabel>
      <Text
        style={{
          position: "absolute",
          left: 233,
          right: 0,
          top: 48,
          height: 23,
          fontSize: 16,
        }}
      >
        Thanatcha
      </Text>
      <Text
        style={{
          position: "absolute",
          left: 167,
          right: 0,
          top: 85,
          height: 23,
          fontSize: 14,
        }}
      >
        You should practice adverb more {"\n"}
        
      </Text>
    </View>
  );
};

export default Header;
