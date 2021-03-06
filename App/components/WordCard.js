import React, { useEffect, useState, useCallback } from "react";
import { Actions } from "react-native-router-flux";
import ReadingApi from "../API/ReadingAPI";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import Constants from "expo-constants";

const WordCard = (props) => {
  const {
    engWord,
    thaiWord,
    onBookMark,
    isBookMark,
    isCheck,
    onCheck,
    onBookMarkNon,
    forWordCollection,
  } = props;
  return (
    <View style={[styles.whiteCard, {borderWidth: forWordCollection? 1 : 0, borderColor: forWordCollection ? "#ddd" : ""}]}>
      <View style={styles.flexArea}>
        {!forWordCollection && (
          <View style={styles.yellowButton}>
            <LinearGradient
              colors={["#FFD387", "#FFE43A"]}
              style={{
                left: 0,
                right: 0,
                top: 0,
                height: 70,
                width: 43,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => onCheck(engWord,thaiWord)}>
                <AntDesign
                  name={isCheck ? "checksquare" : "checksquareo"}
                  size={24}
                  color="#8A63E5"
                />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
        <View style={styles.wordArea}>
          <Text
            style={[styles.content, { marginLeft: forWordCollection ? 50 : 0 }]}
          >
            {engWord}
          </Text>
        </View>
        <View style={styles.wordArea}>
          <Text style={styles.contentThai}>{thaiWord}</Text>
        </View>
        <View style={styles.yellowButton}>
          <LinearGradient
            colors={["#FFD387", "#FFE43A"]}
            style={{
              height: 70,
              width: 43,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => onBookMark(engWord,thaiWord)}>
              <MaterialIcons
                name={isBookMark ? "bookmark" : "bookmark-border"}
                size={24}
                color="#8A63E5"
              />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};
export default WordCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight,
  },
  category: {
    marginTop: 20,
    fontSize: 12,
    fontFamily: "PT-Bold",
    color: "#2DC897",
    marginLeft: 30,
    alignSelf: "flex-start",
  },
  topic: {
    fontSize: 20,
    color: "#000",
    marginBottom: 20,
    marginLeft: 30,
    fontFamily: "PT-Bold",
    alignSelf: "flex-start",
    position: "absolute",
    alignSelf: "center",
  },
  content: {
    fontSize: 16,
    color: "#000",
    fontFamily: "PT-Reg",
  },
  contentThai: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Noto-Reg",
  },
  itemTopic: {
    fontSize: 14,
    color: "#000",
    fontFamily: "PT-Bold",
  },
  headerImg: {
    height: Dimensions.get("window").height / 3.5,
    width: Dimensions.get("window").width,
    opacity: 0.75,
  },

  whiteCard: {
    width: 350,
    height: 70,
    borderRadius: 5,
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
    marginBottom: "10%",
  },
  flexArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  yellowButton: {},
  wordArea: {
    maxWidth: 100,
    minHeight: 70,
    justifyContent: "center",
  },
});
