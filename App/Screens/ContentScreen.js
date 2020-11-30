import React, { useEffect, useState } from "react";
import { Actions } from "react-native-router-flux";
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Text,
  Image,
} from "react-native";
import ButtonClick from "../components/ButtonClick";
import TransWordBar from "../components/TransWordBar";

import Constants from "expo-constants";
import axios from "axios";

const Content = (props) => {
  const [cate, setCate] = useState([]);
  const [cateContent, setCateContent] = useState([]);

  const fetch = async () => {
    await axios
      .get("https://readalright-backend.khanysorn.me/reading/readingId/" + props.text)
      .then(
        (response) => {
          setCate(response.data.reading);
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
  
  function goToChallenge(reading_id) {
    Actions.TestQuizChallenge({ text: reading_id });
  }
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMoreVisible, setModalMoreVisible] = useState(false);
  const [value, onChangeText] = useState("");
  return (
    <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          data={cate}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <Image source={{ uri: item.image }} style={styles.headerImg} />
              <Text style={styles.category}>
                Reading | {item.categoryName} | Level {item.level_reading}
              </Text>
              <Text style={styles.topic}>{item.title}</Text>
              <View style={styles.whiteCard}>
                <Text style={styles.content}>{item.content}</Text>
              </View>
              <ButtonClick
                onPressAction={() => goToChallenge(item.reading_id)}
                text="Challenge"
                fontSize={24}
                fontFamily="PT-Bold"
                fontcolor="#000000"
                height={39}
                width={245}
                radius={30}
                padding={0}
                marginTop={15}
                marginBottom={115}
                colorsStart="#2DC897"
                colorsEnd="#7EF192"
              />
            </View>
          )}
          keyExtractor = { (item, index) => index.toString() }
        />
      <TransWordBar
        textSearch={(text) => onChangeText(text)}
        value={value}
        transAction={() => setModalVisible(true)}
      />
    </View>
  );
};
export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
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
  },
  content: {
    fontSize: 16,
    color: "#000",
    fontFamily: "PT-Reg",
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
  },

  //whiteCard
  whiteCard: {
    // flex: 1,
    width: Dimensions.get("window").width / 1.15,
    // justifyContent: "center",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: "#ffffff",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
    marginBottom: "10%",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
