import React, { useState } from "react";
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

const TransWordBar = (props) => {

  const { textSearch, value, transAction } = props;
  const [getTranslate, setGetTranslate] = useState(""); 
  const [getWord, setWord] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMoreVisible, setModalMoreVisible] = useState(false);
  // const [value, onChangeText] = useState('');

  const translationGoogle = async (word) => {
    setWord(word)
    console.log("translate------------------");
    axios
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
        exampleSentence="Thank you for the birthday present.k you for the birk you for the birk you for the birk you for the bir"
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
