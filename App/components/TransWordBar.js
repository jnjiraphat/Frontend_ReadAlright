import React, { useState, useCallback, useEffect } from "react";
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
import axios from "axios";
import ModalWord from "../components/ModalWord";
import ModalMoreDetail from "../components/ModalMoreDetail";
import { get } from "react-native/Libraries/Utilities/PixelRatio";
import * as firebase from "firebase";

const TransWordBar = (props) => {
  const [engWordBook, setEngWordBook] = useState("");

  const { textSearch, value, transAction } = props;
  const [getTranslate, setGetTranslate] = React.useState("");
  const [getWord, setWord] = useState("");
  const [getChecked, setChecked] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMoreVisible, setModalMoreVisible] = useState(false);
  // const [value, onChangeText] = useState('');
  const [isBookMark, setBookMark] = useState(new Map())
  // const [selected, setSelected] = React.useState();
  const [changeBookMark, setchangeBookMark] = useState(false)

  const [postWord, setPostWord] = useState("")

  const [userId, setUserId] = useState("");


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
    getUid();
  }, []);

  async function getUid() {
    try {
      console.log("get uid first")
      var uid = firebase.auth().currentUser.uid;
      console.log("uid in content vocabbbbbbbbbbbbbbbb")
      console.log(uid)
      getUser(uid);

    } catch (error) {
      console.log("error getItem")
    }
  }

  const getUser = async (uuidTemp) => {
    try {
      console.log("Get UuidTemp");
      console.log(uuidTemp);

      await axios.get("http://10.0.2.2:3000/user/" + uuidTemp).then(
        (response) => {
          console.log("id user in content vocab");
          console.log(response.data.user);
          console.log(response.data.user[0].user_id);
          setUserId(response.data.user[0].user_id);
          // fetch(response.data.user[0].user_id)
        },
        (error) => {
          console.log("error in get userId")

          console.log(error);
        }
      );
    } catch (error) {
      console.log("error get userId2")
    }
  }


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
            user_id: userId
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

  const translationGoogle = async (word) => {
    setWord(word)
    console.log("translate------------------");
    await axios
      .post(
        "https://translation.googleapis.com/language/translate/v2?key=AIzaSyCBEbjkNJ_6_DL8s5Ni6bfF0M4YwhrR-Dc",
        {
          q: word,
          source: "en",
          target: "th",
          format: "text",
        }
      )
      .then(
        (response) => {
          console.log(response.data.data.translations[0].translatedText);
          setGetTranslate(response.data.data.translations[0].translatedText);
          var mean = response.data.data.translations[0].translatedText;
          setEngWordBook(mean)
          console.log("innon" + getTranslate);
          setModalVisible(true)
        },
        (error) => {
          console.log(error);
        }
      )
  };

  // console.log("---------------------------------------")
  // console.log("THIS "+ getTranslate)
  return (
    <View style={styles.barArea}>
      {/* <Text>{getTranslate}</Text> */}
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
          onPressAction={() => translationGoogle(value)}
          colorsStart="#E9B0FF"
          colorsEnd="#8A63E5"
        />

      </LinearGradient>
      <ModalWord
        modalVisible={modalVisible}
        modalClose={() => setModalVisible(false)}
        modalAction={() => setModalVisible(true)}
        modalButton="More Detail"
        engWord={getWord}
        typeWord="n."
        meaning={getTranslate}
        exampleSentence="If you want this. Please Pat for Upgrade version."
        onBookMark={() => onBookMark(getWord)}
        changeBookMark={changeBookMark}
      />
      <ModalMoreDetail
        modalVisible={modalMoreVisible}
        modalClose={() => setModalMoreVisible(false)}
        engWord={getWord}
        typeWord="n."
        meaning={getTranslate}
      />
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
