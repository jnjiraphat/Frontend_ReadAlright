import React, { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ListItem } from "react-native-elements";
import { Avatar } from "react-native-elements";
import LevelLabel from "../components/LevelLabel";
import LevelLabel2 from "../components/LevelLabel2";

import { Ionicons } from "@expo/vector-icons";

const Header = (props) => {
  const onPress = () => {
    if (check == true) {
      setCheck(false);
      console.log(check);
    } else if (check == false) {
      setCheck(true);
      console.log(check);
    }
  };
  const [check, setCheck] = useState(true);

  return check == true ? (
    <View
      style={{ flex: 1, justifyContent: "center", flexDirection: "column" }}
    >
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
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          marginTop: 25,
          marginLeft: 15,
          marginRight: 15,
        }}
      >
        <Avatar
          rounded
          source={{
            uri: "https://randomuser.me/api/portraits/men/41.jpg",
          }}
          size={130}
          containerStyle={{
            // width: 124.2,
            // height: 114.43,
            marginRight: 15,
          }}
        />
        <LevelLabel></LevelLabel>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <TouchableOpacity onPress={onPress}>
          <Ionicons name="ios-arrow-up" size={32} color="black"></Ionicons>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <View
      style={{ flex: 1, justifyContent: "center", flexDirection: "column" }}
    >
      <LinearGradient
        colors={["#FFB382", "#F07590"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 150,
          width: Dimensions.get("window").width,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          marginTop: 25,
          marginLeft: 15,
          marginRight: 15,
        }}
      >
        <Avatar
          rounded
          source={{
            uri: "https://randomuser.me/api/portraits/men/41.jpg",
          }}
          size={80}
          containerStyle={{
            // width: 124.2,
            // height: 114.43,
            marginRight: 15,
          }}
        />
        <LevelLabel2></LevelLabel2>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableHighlight onPress={onPress}>
          <Ionicons name="ios-arrow-down" size={32} color="black"></Ionicons>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Header;


