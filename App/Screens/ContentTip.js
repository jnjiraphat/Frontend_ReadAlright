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
  // const [cateContent, setCateContent] = useState([]);

  const fetch = async () => {
    console.log("runningggggggggggggggggggggggggggggg");
    await axios
      .get("http://10.0.2.2:3000/getTricksByTrickID/" + props.text)
      .then(
        (response) => {
          console.log("Tip");
          console.log(response.data.quiz);
          setTricks(response.data.quiz)
          // setCate(response.data.reading);
          // var str = "my car is red";
          // var stringArray = str
          //   .split(/(\s+)/)
          //   .filter((e) => e.trim().length > 0);
          // console.log(stringArray);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const read = async () => {
    const data = await fetch();
  };

  console.log("After get tricks")
  console.log(tricks)
  // const getContent = async () => {
  //   const contentStory = cate[0].content;
  //   console.log(contentStory);
  //   const contentArray = contentStory
  //     .split(/(\s+)/)
  //     .filter((e) => e.trim().length > 0);
  //   console.log(contentArray);
  //   setCateContent(contentArray);
  //   console.log("MY CATEEEEEEEEEEEEE");
  //   console.log(cateContent);
  // };
  useEffect(() => {
    read();
    // getContent();
    // console.log(cate[0].content);
  }, []);
  // console.log("This is reading id  ");
  // console.log(props.text);

  // function goToChallenge(reading_id) {
  //   console.log("readingIDDDDDDDDDDDD  " + reading_id);
  //   Actions.TestQuizChallenge({ text: reading_id });
  //   console.log("Finish " + reading_id);
  //   console.log("readingIDDDDDDDDDDDD" + reading_id);
  // }
  // const goToAbout = () => {
  //    Actions.about()
  // }
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMoreVisible, setModalMoreVisible] = useState(false);
  const [value, onChangeText] = useState("");
  return (
    <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          data={tricks}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <LinearGradient
                  colors={["#FFB482", "#F07590"]}
                  style={styles.headerImg}
                >
                {/* <Text style={styles.topic}>{item.title}</Text> */}
                <Text style={styles.topic}>{item.trick_title}</Text>
              
              </LinearGradient>
              <View style={styles.whiteCard}>
                {/* <Text style={styles.content}>{item.content}</Text> */}
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
    // alignItems: "center",
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

  //whiteCard
  whiteCard: {
    // flex: 1,
    marginBottom: "10%",
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
});
