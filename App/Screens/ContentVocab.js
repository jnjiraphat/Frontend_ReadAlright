import React, { useEffect, useState, useCallback } from "react";
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
  TouchableOpacity,

} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

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
    engWord: "Swimmingdddddd",
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
  // const translationGoogle = async (word) => {
  //   console.log("translate------------------");
  //   axios
  //     .post(
  //       "https://translation.googleapis.com/language/translate/v2?key=AIzaSyCBEbjkNJ_6_DL8s5Ni6bfF0M4YwhrR-Dc",
  //       {
  //         q: word,
  //         source: "en",
  //         target: "th",
  //         format: "text",
  //       }
  //     )
  //     .then(
  //       (response) => {
  //         console.log(response.data);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // };
  const [vocabCard, setVocabCard] = useState([]);
  const [vocabBoxName, setvocabBoxName] = useState("");
  const [vocabBoxImg, setvocabBoxImg] = useState("");


  // const [title , setTitle] = useState([]);

  const fetch = async () => {
    console.log("runningggggggggggggggggggggggggggggg");
    await axios
      .get("http://10.0.2.2:3000/vocabCard/" + props.text)
      .then(
        (response) => {
          console.log("eieiContentVocab");
          console.log(response.data.reading);
          setVocabCard(response.data.reading);
          console.log("---------------------------------------");
          setvocabBoxName(response.data.reading[0].boxEngName);
          console.log(vocabBoxName);
          setvocabBoxImg(response.data.reading[0].image);
          console.log(vocabBoxImg);
          // console.log(response.data[0].reading);
          // setTitle(response.data[0].reading);
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

  
  // console.log("This is reading id  ");
  // console.log(props.text);

  // function goToChallenge(reading_id) {
  //   console.log("readingIDDDDDDDDDDDD  " + reading_id);
  //   Actions.TestQuizChallenge({ text: reading_id });
  //   console.log("Finish " + reading_id);
    // console.log("readingIDDDDDDDDDDDD" + reading_id);
  // }
  // const goToAbout = () => {
  //    Actions.about()
  // }
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMoreVisible, setModalMoreVisible] = useState(false);
  const [isBookMark, setBookMark] = useState(new Map());
  const [changeBookMark, setchangeBookMark] = useState(false);
  const [isCheck, setCheck] = useState(new Map());
  const [changeCheck, setchangeCheck] = useState(false);

  const onBookMark = React.useCallback(
    async (getWord) => {
      const newSelected = new Map(isBookMark);
      newSelected.set(getWord, !isBookMark.get(getWord));
      setBookMark(newSelected);
      if (!isBookMark.get(getWord) == true) {
        setChecked(true)
        var bookmark = []
        setchangeBookMark(true);
      }

      if (!isBookMark.get(getWord) == false) {
        setchangeBookMark(false);
        setChecked(false)
        console.log(getWord)
        await axios
          .delete("http://10.0.2.2:3000/wordCol/del/" + getWord)
          .then(
            (response) => {
              console.log("delete bookmark success!!!");
            },
            (error) => {
              console.log(error);
            }
          );
      }
    },
    [isBookMark],
    // console.log(getWord),
    // console.log(isBookMark),
  );
  useEffect(() => {
    if (getChecked == true) {
      console.log(isBookMark)
      console.log(getTranslate)
      var bookmark = [];
      function logMapElements(value, key, map) {
        console.log(`m[${key}] = ${value}`);
        if (value == true) {
          bookmark.push(key);
        }
        console.log("length = " + bookmark.length);
      }
      isBookMark.forEach(logMapElements);
      for (let index = 0; index < bookmark.length; index++) {
        axios
          .post("http://10.0.2.2:3000/wordCol", {
            wordCol_Thai: getTranslate,
            wordCol_Eng: getWord,
            user_id: 1
          })
          .then(
            (response) => {
              console.log("upload bookmark success!!!");
            },
            (error) => {
              console.log(error);
            }
          );
      }
    } else {

    }


  }, [getChecked]);

  // const onBookMark = useCallback(
  //   (engWord) => {
  //     const newSelected = new Map(isBookMark);
  //     newSelected.set(engWord, !isBookMark.get(engWord));

  //     setBookMark(newSelected);
  //     if (!isBookMark.get(engWord) == true) {
  //       setchangeBookMark(true);
  //     }
  //     if (!isBookMark.get(engWord) == false) {
  //       setchangeBookMark(false);
  //     }
  //   },
  //   [isBookMark],
  //   console.log(engWord),
  //   console.log(isBookMark)
  // );
  
  const onCheck = useCallback(
    (engWord) => {
      const newSelected = new Map(isCheck);
      newSelected.set(engWord, !isCheck.get(engWord));

      setCheck(newSelected);
      if (!isCheck.get(engWord) == true) {
        setchangeCheck(true);
      }
      if (!isCheck.get(engWord) == false) {
        setchangeCheck(false);
      }
    },
    [isCheck],
    console.log(engWord),
    console.log(isCheck)
  );

  return (
    <ScrollView>
      
          <View style={styles.container}>
            <Image source={{ uri: vocabBoxImg }} style={styles.headerImg} />
            <Text style={styles.topic}>{vocabBoxName}</Text>
          </View>
        
      <View style={{ flex: 1, alignItems: "center" }}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          data={vocabCard}
          renderItem={({ item }) => (
            <View style={styles.whiteCard}>
              <View style={styles.flexArea}>
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
                    <TouchableOpacity onPress={() => onCheck(item.engWord)}>
                      <AntDesign name={changeCheck ? "checksquare" : "checksquareo"} size={24} color="#8A63E5" />
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
                <View style={styles.wordArea}>
                  <Text style={styles.content}>{item.engWord}</Text>
                </View>
                <View style={styles.wordArea}>
                  <Text style={styles.contentThai}>{item.thaiWord}</Text>
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
                    <TouchableOpacity onPress={() => onBookMark(item.engWord)}>
                      {/* engWord คือตัวข้อความที่จะรับไว้ส่งค่า */}
                      <MaterialIcons
                        name={changeBookMark ? "bookmark" : "bookmark-border"}
                        size={24}
                        color="#8A63E5"
                        style={{ marginRight: 10 }}
                      />
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            </View>
          )}
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
