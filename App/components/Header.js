import React, { useState, useEffect } from "react";

import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Avatar from "../components/Avatar";
import AreaProfile from "../components/AreaProfile";
import SwitchType from "../components/SwitchType";
import { AsyncStorage } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { setLogLevel } from "firebase";

const Header = (props) => {
  const { tabs, ContentDefault, ContentChange, suggestion, isSwitch } = props;


  const [level, setLevel] = useState(""); 
  const [picture, showPic] = useState("");

  
  const getUserPic = async () => {
    try {
      console.log("MyUserPIc 1")
      var userPicture = await AsyncStorage.getItem('userPicURL');
      var level = await AsyncStorage.getItem('level');

      console.log("MyUserPIc 2")
      console.log(userPicture)
      console.log("MyUserPIc 2")

    } catch (error) {
      console.log("MyUserPIc 3")
    } finally {
      setLevel(level);
      showPic(userPicture)
    }
  }
  useEffect(() => {
    getUserPic();
  }, []);
  console.log("In headerNOn");
  console.log(picture)
  console.log(suggestion);
  console.log("In headerNon");
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

  return suggestion != null && picture != "" ? (
    check == true ? (
      <View
        style={
          isSwitch ? { height: Dimensions.get("window").height } : {}
        }
      >
        <View>
          <LinearGradient
            colors={["#F07590", "#FFB382"]}
            style={{
              left: 0,
              right: 0,
              top: 0,
              // height: Dimensions.get("window").height / 3.8,
              height: 200,
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
                source={picture}
                // width={Dimensions.get("window").width / 3.5}
                // height={Dimensions.get("window").height / 7}
                width={110}
                height={110}
              />
              <AreaProfile level={level} suggestion={suggestion} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={onPress}>
                <Ionicons
                  name="ios-arrow-up"
                  size={30}
                  color="black"
                ></Ionicons>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
        {isSwitch && (
          <View
            style={{
              flex: 1,
              bottom: "4%",
              backgroundColor: "transparent",
            }}
          >
            <SwitchType
              tabs={tabs}
              ContentDefault={ContentDefault}
              ContentChange={ContentChange}
            />
          </View>
        )}
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
              // height: Dimensions.get("window").height / 8,
              height: 100,
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
                source={picture}
                // width={Dimensions.get("window").width / 5.5}
                width={80}
                // height={Dimensions.get("window").height / 10}
                height={80}
              />
              <AreaProfile level={level} display="none" />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={onPress}>
                <Ionicons
                  name="ios-arrow-down"
                  size={32}
                  color="black"
                ></Ionicons>
              </TouchableOpacity>
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
      )
  ) : (
      <View>
        <Text> Loadingggggggggggggggggggggggggggggg</Text>
      </View>
    );
};

export default Header;
