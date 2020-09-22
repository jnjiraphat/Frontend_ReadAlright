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
import WordCard from '../components/WordCard'

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
  const [isCheck, setCheck] = useState(new Map());
  const [getChecked, setChecked] = useState(false);
  const [getChecked2, setChecked2] = useState(false);

  const [changeBookMark, setchangeBookMark] = useState(false)
  const [temp, setTemp] = useState(0)
  const [newThaiWord, setNewThaiWord] = useState("")


  const onBookMark = React.useCallback(
    async (engWord, thaiWord) => {
      setChecked(false)
      setChecked2(false)
      console.log(thaiWord)
      setNewThaiWord(thaiWord)
      const newSelected = new Map(isBookMark);
      newSelected.set(engWord, !isBookMark.get(engWord));
      setBookMark(newSelected);
      if (!isBookMark.get(engWord) == true) {
        setChecked(true)
        setChecked2(true)

        var bookmark = []
        setchangeBookMark(true);

      }

      else if (!isBookMark.get(engWord) == false) {
        try {

          console.log(engWord)
          await axios
            .delete("http://10.0.2.2:3000/wordCol/del/" + engWord)
            .then(
              (response) => {
                console.log("delete bookmark success!!!");
              },
              (error) => {
                console.log(error);
              }
            );
        } catch (error) {

        } finally {
          setchangeBookMark(false);
          setChecked(false);
          setChecked2(false);

          setTemp(temp - 1);

        }
      }
    },
    [isBookMark],
    // console.log(getWord),
    // console.log(isBookMark),
  );

  useEffect(() => {

    if (getChecked2 === true) {
      try {
        console.log(isBookMark)
        // console.log(getTranslate)
        var bookmark = [];
        function logMapElements(value, key, map) {
          console.log(`m[${key}] = ${value}`);
          if (value == true) {
            bookmark.push(key);
          }
          console.log("length = " + bookmark.length);
        }
        console.log(temp)
        isBookMark.forEach(logMapElements);
        for (let index = temp; index < bookmark.length; index++) {
          axios
            .post("http://10.0.2.2:3000/wordCol", {
              wordCol_Thai: newThaiWord,
              wordCol_Eng: bookmark[index],
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
      } catch (error) {

      } finally {
        setTemp(temp + 1);

        setChecked(false)        
        setChecked2(false)

      }

    } else {
      console.log("getCheck = false")
    }
  }, [getChecked]);

  const onCheck = React.useCallback(
    async (engWord, thaiWord) => {
      console.log(thaiWord)
      const newChecked = new Map(isCheck);
      newChecked.set(engWord, !isCheck.get(engWord));
      setCheck(newChecked);
    },
    [isCheck],
    // console.log(getWord),
    // console.log(isBookMark),
  );


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

  // const onCheck = useCallback(
  //   (engWord) => {
  //     const newSelected = new Map(isCheck);
  //     newSelected.set(engWord, !isCheck.get(engWord));

  //     setCheck(newSelected);
  //     if (!isCheck.get(engWord) == true) {
  //       setchangeCheck(true);
  //     }
  //     if (!isCheck.get(engWord) == false) {
  //       setchangeCheck(false);
  //     }
  //   },
  //   [isCheck],
  //   console.log(engWord),
  //   console.log(isCheck)
  // );


  //   // console.log(getWord),
  //   // console.log(isBookMark),
  // );


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
          keyExtractor={item => item.vocabCard_id}
          renderItem={({ item }) => (
            <WordCard
              engWord={item.engWord}
              thaiWord={item.thaiWord}
              onBookMark={onBookMark}
              isBookMark={!!isBookMark.get(item.engWord, item.thaiWord)}
              onCheck={onCheck}
              isCheck={!!isCheck.get(item.engWord, item.thaiWord)}
            />
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
});
