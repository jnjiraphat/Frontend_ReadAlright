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
import AreaProfile from "../components/AreaProfile";
import SwitchType from "../components/SwitchType";

import { Ionicons } from "@expo/vector-icons";

const Header = (props) => {
  const { tabs, ContentDefault, ContentChange } = props;

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
      style={{
        justifyContent: "center",
        height: Dimensions.get("window").height,
        backgroundColor: "transparent",
      }}
    >
      <View
        style={{
          // flex: 1,
          // justifyContent: "center",
          // flexDirection: "column",
          backgroundColor: "transparent",
          // height: Dimensions.get("window").height / 4,
        }}
      >
        <LinearGradient
          colors={["#F07590", "#FFB382"]}
          style={{
            left: 0,
            right: 0,
            top: 0,
            height: Dimensions.get("window").height / 3.3,
            width: Dimensions.get("window").width,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              flex: 0,
              marginTop: "5%",
              marginLeft: 15,
              marginRight: 15,
            }}
          >
            <Avatar
              rounded
              source={{
                uri: "https://randomuser.me/api/portraits/men/41.jpg",
              }}
              size={Dimensions.get("window").width / 3.5}
              containerStyle={{
                marginRight: 15,
              }}
            />
            <AreaProfile level="A1" />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={onPress}>
              <Ionicons name="ios-arrow-up" size={32} color="black"></Ionicons>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
      <View
        style={{
          flex: 1,
          bottom: "5%",
          backgroundColor: "transparent",
        }}
      >
        <SwitchType
          tabs={tabs}
          ContentDefault={ContentDefault}
          ContentChange={ContentChange}
        />
      </View>
    </View>
  ) : (
    <View
      style={{
        height: Dimensions.get("window").height,
        // backgroundColor: "red",
      }}
    >
      <LinearGradient
        colors={["#F07590", "#FFB382"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: Dimensions.get("window").height / 6,
          width: Dimensions.get("window").width,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            marginTop: "2%",
            marginLeft: 15,
            marginRight: 15,
          }}
        >
          <Avatar
            rounded
            source={{
              uri: "https://randomuser.me/api/portraits/men/41.jpg",
            }}
            size={Dimensions.get("window").width / 4}
            containerStyle={{
              // width: 124.2,
              // height: 114.43,
              marginRight: 15,
            }}
          />
          <AreaProfile level="A1" display="none" />
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
      </LinearGradient>
      <View style={{ flex: 1, top: "18%" }}>
        <SwitchType
          tabs={tabs}
          ContentDefault={ContentDefault}
          ContentChange={ContentChange}
          SwitchDisplay="none"
        />
      </View>
    </View>
  );
};

export default Header;
