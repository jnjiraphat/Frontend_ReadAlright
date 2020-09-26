import React from "react";
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
  const { isCheck, onCheck, suggestion ,suggestId} = props;
  console.log("Hi Suggestion")
  console.log(props.suggestion)
  console.log(props.suggestion.length)
  console.log(suggestion)

  if (suggestion) {
    return (
      <View>
        {/* {isCheck && ( */}
        <View style={styles.whiteCard}>
          <View style={styles.flexArea}>
            <View style={styles.wordArea}>
              <Text style={styles.content}>{props.suggestion}</Text>
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
                <TouchableOpacity onPress={() => onCheck(props.suggestId)}>
                  {/* engWord คือตัวข้อความที่จะรับไว้ส่งค่า */}
                  <MaterialIcons
                    name={"bookmark"}
                    name={isCheck ? "bookmark-border" : "bookmark"}
                    size={24}
                    color="#8A63E5"
                  />
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
        {/* )} */}
      </View>
    );
  } else {
    return (
      <View><Text>Loading</Text></View>
    )
  }

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
    marginLeft: 25,
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

  //whiteCard
  whiteCard: {
    // flex: 1,
    width: 350,
    height: 70,
    // justifyContent: "center",
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
    borderWidth: 1,
    borderColor: "#ddd",
  },
  flexArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  yellowButton: {},
  wordArea: {
    // paddingVertical: 5,
    maxWidth: 100,
    minHeight: 70,
    justifyContent: "center",
  },
});
