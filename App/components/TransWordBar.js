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
          .delete("https://readalright-backend.khanysorn.me/wordCol/del/" + getWord)
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
    
  );


  useEffect(() => {
    getUid();
  }, []);

  async function getUid() {
    try {
      var uid = firebase.auth().currentUser.uid;
      getUser(uid);

    } catch (error) {
      console.log("error getItem")
    }
  }

  const getUser = async (uuidTemp) => {
    try {
     
      await axios.get("https://readalright-backend.khanysorn.me/user/" + uuidTemp).then(
        (response) => {
          setUserId(response.data.user[0].user_id);
          
        },
        (error) => {
          
          console.log(error);
        }
      );
    } catch (error) {
      console.log("error get userId2")
    }
  }


  useEffect(() => {
    if (getChecked == true) {
      var bookmark = [];
      function logMapElements(value, key, map) {
        if (value == true) {
          bookmark.push(key);
        }
      }
      isBookMark.forEach(logMapElements);
      for (let index = 0; index < bookmark.length; index++) {
        axios
          .post("https://readalright-backend.khanysorn.me/wordCol", {
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
          setGetTranslate(response.data.data.translations[0].translatedText);
          var mean = response.data.data.translations[0].translatedText;
          setEngWordBook(mean)
          setModalVisible(true)
        },
        (error) => {
          console.log(error);
        }
      )
  };

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
