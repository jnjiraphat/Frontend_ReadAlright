import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Dimensions,
  Text,
  Image,
} from "react-native";
import WordCard from '../components/WordCard'

import Constants from "expo-constants";
import axios from "axios";
import * as firebase from "firebase";


const Content = (props) => {
  const [vocabCard, setVocabCard] = useState([]);
  const [vocabBoxName, setvocabBoxName] = useState("");
  const [vocabBoxImg, setvocabBoxImg] = useState("");
  const [userId, setUserId] = useState("");

  const fetch = async () => {
    await axios
      .get("https://readalright-backend.khanysorn.me/vocabCard/" + props.text)
      .then(
        (response) => {
          setVocabCard(response.data.reading);
          setvocabBoxName(response.data.reading[0].boxEngName);
          setvocabBoxImg(response.data.reading[0].image);
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
      console.log("error get userId4")
    }
  }


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

          await axios
            .delete("https://readalright-backend.khanysorn.me/wordCol/del/" + engWord)
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
    
  );

  useEffect(() => {

    if (getChecked2 === true) {
      try {
        var bookmark = [];
        function logMapElements(value, key, map) {
          if (value == true) {
            bookmark.push(key);
          }
        }
        isBookMark.forEach(logMapElements);
        for (let index = temp; index < bookmark.length; index++) {
          axios
            .post("https://readalright-backend.khanysorn.me/wordCol", {
              wordCol_Thai: newThaiWord,
              wordCol_Eng: bookmark[index],
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
          keyExtractor = { (item, index) => index.toString() }
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
