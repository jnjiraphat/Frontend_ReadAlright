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
import ModalWord from "../components/ModalWord";
import ModalMoreDetail from "../components/ModalMoreDetail";

import Constants from "expo-constants";
import axios from "axios";

const data = [
  {
    engWord: "Swimming",
    thaiWord: "ว่ายน้ำ",
  },
  {
    engWord: "Swimming",
    thaiWord: "ว่ายน้ำ",
  },
  {
    engWord: "Swimming",
    thaiWord: "ว่ายน้ำ",
  },
  {
    engWord: "Swimming",
    thaiWord: "ว่ายน้ำ",
  },
];

const dataImg = [
  {
    image:
      "https://vignette.wikia.nocookie.net/diamondnoace/images/9/96/Haruichi_Act_2.png/revision/latest?cb=20190709155009",
    title: "Marine Sport",
  },
];

const Content = (props) => {
  const translationGoogle = async (word) => {
    console.log("translate------------------");
    axios
      .post("https://translation.googleapis.com/language/translate/v2?key=AIzaSyCBEbjkNJ_6_DL8s5Ni6bfF0M4YwhrR-Dc", {
        "q": word,
        "source": "en",
        "target": "th",
        "format": "text"
      })
      .then(
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const [cate, setCate] = useState([]);

  const fetch = async () => {
    console.log("runningggggggggggggggggggggggggggggg");
    await axios
      .get("http://10.0.2.2:3000/reading/readingId/" + props.text)
      .then(
        (response) => {
          console.log("eieiContent");
          console.log(response.data.reading);
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
  console.log("This is reading id  ");
  console.log(props.text);

  function goToChallenge(reading_id) {
    console.log("readingIDDDDDDDDDDDD  " + reading_id);
    Actions.TestQuizChallenge({ text: reading_id });
    console.log("Finish " + reading_id);
    // console.log("readingIDDDDDDDDDDDD" + reading_id);
  }
  // const goToAbout = () => {
  //    Actions.about()
  // }
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMoreVisible, setModalMoreVisible] = useState(false);
  return (
    <ScrollView>
      <FlatList
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        data={dataImg}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.headerImg} />
            <Text style={styles.topic}>{item.title}</Text>
          </View>
        )}
      />
      <View style={{ flex: 1, alignItems: "center" }}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          data={data}
          renderItem={({ item }) => (
            <View style={styles.whiteCard}>
              <Text style={styles.content}>
                {item.engWord},{item.thaiWord}
              </Text>
            </View>
          )}
        />
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
          marginTop={20}
          marginBottom={40}
          // shadowRadius={30}
          colorsStart="#2DC897"
          colorsEnd="#7EF192"
        // contentId = {item.reading_id}
        />
        <ButtonClick
          onPressAction={() => translationGoogle("ant")}
          text="Trans"
          fontSize={24}
          fontFamily="PT-Bold"
          fontcolor="#000000"
          height={39}
          width={245}
          radius={30}
          padding={0}
          marginTop={20}
          marginBottom={40}
          // shadowRadius={30}
          colorsStart="#2DC897"
          colorsEnd="#7EF192"
        // contentId = {item.reading_id}
        />
        <ModalWord
          modalVisible={modalVisible}
          modalClose={() => setModalVisible(false)}
          modalAction={() => setModalMoreVisible(true)}
          modalButton="More Detail"
          engWord="Present"
          typeWord="n."
          meaning="ของขวัญ"
          exampleSentence="Thank you for the birthday present.k you for the birk you for the birk you for the birk you for the bir"
        />
        <ModalMoreDetail
          modalVisible={modalMoreVisible}
          modalClose={() => setModalMoreVisible(false)}
          engWord="Present"
          typeWord="n."
          meaning="ปัจจุบัน"
        />
      </View>
    </ScrollView>
  );
};
export default Content;

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
    width: Dimensions.get("window").width / 2,
    // justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "white",
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
