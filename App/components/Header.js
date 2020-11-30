import React, { useState, useEffect } from "react";
import { Actions } from "react-native-router-flux";
import {
  TouchableOpacity,
  View,
  Dimensions,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Avatar from "../components/Avatar";
import AreaProfile from "../components/AreaProfile";
import SwitchType from "../components/SwitchType";
import { AsyncStorage } from "react-native";
import * as firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import ButtonClick from '../components/ButtonClick'
import LoadingScreen from '../Screens/LoadingScreen'

const Header = (props) => {
  const { tabs, ContentDefault, ContentChange, suggestion, isSwitch } = props;

  const [level, setLevel] = useState("");
  const [picture, showPic] = useState("");

  const getUserPic = async () => {
    try {
      var userPicture = await AsyncStorage.getItem("userPicURL");
      var level = await AsyncStorage.getItem("level");

    } catch (error) {
      console.log("MyUserPIc 3");
    } finally {
      setLevel(level);
      showPic(userPicture);
    }
  };
  useEffect(() => {
    getUserPic();
  }, []);
  const onPress = () => {
    if (check == true) {
      setCheck(false);
    } else if (check == false) {
      setCheck(true);
    }
  };
  const [check, setCheck] = useState(true);
  async function goToLogout() {
    await firebase.auth().signOut();
    await removeItemValue();
  }

  async function removeItemValue() {
    try {
      var token = await AsyncStorage.getItem("token");
      await AsyncStorage.removeItem("uid");
      await AsyncStorage.removeItem("pretest");
      await AsyncStorage.removeItem("emailSign");
      await AsyncStorage.removeItem("googleSign");
      await AsyncStorage.removeItem("userName");
      await AsyncStorage.removeItem("userPicURL");
      await AsyncStorage.removeItem("token");
    } catch (exception) {
      console.log("error remove item");
    } finally {
      Actions.Login();
    }
  }

  return suggestion != null && picture != "" ? (
    check == true ? (
      <View style={isSwitch ? { height: Dimensions.get("window").height } : {}}>
        <View>
          <LinearGradient
            colors={["#F07590", "#FFB382"]}
            style={{
              left: 0,
              right: 0,
              top: 0,
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
              <View>
        <View style={{ position: "absolute", bottom: 0, zIndex: 1}}>
        <ButtonClick
              text="Logout"
              fontSize={12}
              fontFamily="PT-Bold"
              fontcolor="#000000"
              height={30}
              width={50}
              radius={30}
              padding={0}
              onPressAction={() => goToLogout()}
              // shadowRadius={30}
              colorsStart="#FF3E30"
              colorsEnd="#FF3E30"
              />
        </View>
              <Avatar
                source={picture}
                width={110}
                height={110}
              />
      </View>
              <AreaProfile level={level} suggestion={suggestion} />
            </View>

              
              <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View>
              </View>
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
          
        }}
      >
        <LinearGradient
          colors={["#F07590", "#FFB382"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
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
              width={80}
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
    <View style={{ flex: 1 }}>
      <LoadingScreen />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  button: {
    width: 50,
    
  },rowItemImg: {
    borderColor: "transparent",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    width: 100,
    height: 90,
  },
});