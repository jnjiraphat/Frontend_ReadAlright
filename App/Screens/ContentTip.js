import React, { useEffect, useState } from "react";
import { Actions } from "react-native-router-flux";
import ReadingApi from "../API/ReadingAPI";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  Text,
  Image,
} from "react-native";
import ButtonClick from "../components/ButtonClick";
import { LinearGradient } from "expo-linear-gradient";

import Constants from "expo-constants";
import axios from "axios";

const ContentTip = (props) => {
  console.log("this is trick id ")
  console.log(props.text)
  const [tricks, setTricks] = useState([]);
  
  const fetch = async () => {
    await axios
      .get("https://readalright-backend.khanysorn.me/getTricksByTrickID/" + props.text)
      .then(
        (response) => {
          setTricks(response.data.quiz)
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const read = async () => {
    const data = await fetch();
  };

  useEffect(() => {
    read();
  }, []);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMoreVisible, setModalMoreVisible] = useState(false);
  const [value, onChangeText] = useState("");
  
  return (
    <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={tricks}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <LinearGradient
                  colors={["#FFB482", "#F07590"]}
                  style={styles.headerImg}
                >
                <Text style={styles.topic}>{item.trick_title}</Text>
              
              </LinearGradient>
              <View style={styles.whiteCard}>
                <Text style={styles.content}>{item.trick_detail}</Text>
              </View>
            </View>
          )}
          keyExtractor = { (item, index) => index.toString() }
        />
    </View>
  );
};
export default ContentTip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 24,
    color: "#000",
    marginBottom: 20,
    marginHorizontal: 40,
    fontFamily: "Noto-Bold",
  },
  content: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Noto-Reg",
    alignSelf: "flex-start",
    marginRight: 3,
  },
  itemTopic: {
    fontSize: 14,
    color: "#000",
    fontFamily: "PT-Bold",
  },

  headerImg: {
    height: Dimensions.get("window").height / 3.5,
    width: Dimensions.get("window").width,
    justifyContent: "flex-end"
  },

  whiteCard: {
    marginBottom: "10%",
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
});
