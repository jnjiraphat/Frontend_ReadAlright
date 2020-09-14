import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import ButtonClick from "./ButtonClick";
import { LinearGradient } from "expo-linear-gradient";


const TransWordBar = (props) => {
    
    const { textSearch, value, transAction} = props;
  return (
    <View style={styles.barArea}>
      <LinearGradient
        colors={["#FFD387", "#FFE43A"]}
        style={{
          left: 0,
          right: 0,
          top: 0,
          height: 70,
          width: Dimensions.get("window").width,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row"
        }}
      >
        <TextInput
          style={styles.textInput}
          onChangeText={textSearch}
          value={value}
        />
        <ButtonClick
            text="แปล"
            fontSize={20}
            fontcolor="#000000"
            fontFamily="Noto-Reg"
            height={50}
            width={70}
            radius={5}
            padding={0}
            onPressAction={transAction}
            colorsStart="#E9B0FF"
            colorsEnd="#8A63E5"
        />
      </LinearGradient>
    </View>
  );
};
export default TransWordBar;

const styles = StyleSheet.create({
  barArea: {
    width: Dimensions.get("window").width,
    height: 70,
    bottom: 0,
    position: "absolute",
  },
  textInput: {
      width: 250,
      height: 50,
      backgroundColor: "#fff",
      borderRadius: 5,
      marginRight: 10
  }
});
