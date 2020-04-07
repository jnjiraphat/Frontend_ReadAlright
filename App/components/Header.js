import React from "react";
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

import { Ionicons } from "@expo/vector-icons";

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
  const check = false;
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
        You should practice adverb more
      </Text>
      <TouchableHighlight
        // onPress={this.onBooking}
        style={styles.btnClickContain}
        // underlayColor="#042417"
      >
        <View style={styles.btnContainer}>
          {/* <ion-icon name="chevron-down-outline"></ion-icon> */}
          <Ionicons name="ios-arrow-down" size={32} color="black" />
          {/* <ion-icon name="arrow-down"></ion-icon> */}
          {/* <Icon type='down' size='lg' color="red"/> */}
        </View>
      </TouchableHighlight>
      
    </View>
  );
};

export default Header;

var styles = StyleSheet.create({
  btnClickContain: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'stretch',
    // alignSelf: 'stretch',
    // backgroundColor: '#009D6E',
    // borderRadius: 5,
    // padding: 5,
    // marginTop: 5,
    // marginBottom: 5,
  },
  btnContainer: {
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'stretch',
    // alignSelf: 'stretch',
    // borderRadius: 10,
  },
  btnIcon: {
    // height: 25,
    // width: 25,
  },
  btnText: {
    // fontSize: 18,
    // color: '#FAFAFA',
    // marginLeft: 10,
    // marginTop: 2,
  },
});
