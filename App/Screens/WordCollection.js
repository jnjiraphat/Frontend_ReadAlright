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
  RefreshControl,

} from "react-native";
import WordCard from '../components/WordCard'

import Constants from "expo-constants";
import axios from "axios";
import { AsyncStorage } from "react-native";
import * as firebase from "firebase";
import { get } from "react-native/Libraries/Utilities/PixelRatio";
import LoadingScreen from '../Screens/LoadingScreen'

const WordCollection = (props) => {
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


  const [uuid, setUuid] = useState("");
  const [userId, setUserId] = useState("");


  async function getUid() {
    try {
      console.log("get uid first")
      var uid = firebase.auth().currentUser.uid;
      console.log(uid)
      getUser(uid);
      // const value = await AsyncStorage.getItem('uid');
      // if (value !== null) {
      //   // We have data!!
      //   getUser(value)
      //   setUuid(value);
      //   console.log(value);
      // }
    } catch (error) {
      console.log("error getItem")
      // Error retrieving data
    }
  }

  const getUser = async (uuidTemp) => {
    try {
      console.log("Get UuidTemp");
      console.log(uuidTemp);

      // const response = await fetch('http://10.0.2.2:3000/user/' + uuid, {
      //   method: 'GET',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //   }
      // });
      // const data = await response.json();
      // console.log(response)
      await axios.get("http://10.0.2.2:3000/user/" + uuidTemp).then(
        (response) => {
          console.log("id user");
          console.log(response.data.user);
          console.log(response.data.user[0].user_id);
          setUserId(response.data.user[0].user_id);
          fetch(response.data.user[0].user_id)
        },
        (error) => {
          console.log("error in get userId")

          console.log(error);
        }
      );
    } catch (error) {
      console.log("error get userId8 ")
    }
  }
  // async function setUp() {
  //   console.log("processingg")
  //   await getUid();
  // await getUser();
  // await fetch();
  // }


  const [wordCol, setWordCol] = useState([]);

  const fetch = async (userIdTemp) => {
    const newSelected = new Map(isBookMark);
    console.log("userId")
    console.log(userIdTemp)
    await axios.get("http://10.0.2.2:3000/wordCol/" + userIdTemp).then(
      (response) => {
        for (let index = 0; index < response.data.word.length; index++) {
          newSelected.set(response.data.word[index]['wordCol_Eng'], true);

        }
        setBookMark(newSelected);
        setWordCol(response.data.word);
      },
      (error) => {
        console.log("error in fetch")
        console.log(error);
      }
    );
  };

  // const read = async () => {
  //   const data = await fetch();
  // };
  useEffect(() => {
    // setUp();
    getUid();
    // getUser();
    // read();

  }, []);
  // console.log("This is reading id  ");
  // console.log(props.text);

  // function goToChallenge(reading_id) {
  //   console.log("readingIDDDDDDDDDDDD  " + reading_id);
  //   Actions.TestQuizChallenge({ text: reading_id });
  // console.log("Finish " + reading_id);
  // console.log("readingIDDDDDDDDDDDD" + reading_id);
  // }
  // const goToAbout = () => {
  //    Actions.about()
  // }
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMoreVisible, setModalMoreVisible] = useState(false);
  const [isBookMark, setBookMark] = useState(new Map());

  const onBookMark = React.useCallback(
    async (wordCol_Eng) => {
      const newSelected = new Map(isBookMark);
      newSelected.set(wordCol_Eng, !isBookMark.get(wordCol_Eng));
      setBookMark(newSelected);
      if (!isBookMark.get(wordCol_Eng) == true) {
        var bookmark = []
      }

      if (!isBookMark.get(wordCol_Eng) == false) {
        console.log(wordCol_Eng)
        await axios
          .delete("http://10.0.2.2:3000/wordCol/del/" + wordCol_Eng)
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
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise(resolve => {
      fetch(userId);
      setTimeout(resolve, timeout);
    });
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  if (wordCol.length != 0) {
    return (
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      >
        <View style={styles.container}>
          <Text style={styles.topic}>Word Collection</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
          <FlatList
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            data={wordCol}
            renderItem={({ item }) => (
              <WordCard
                engWord={item.wordCol_Eng}
                thaiWord={item.wordCol_Thai}
                onBookMark={onBookMark}
                isBookMark={!!isBookMark.get(item.wordCol_Eng)}
                forWordCollection={true}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
      <LoadingScreen />
    </View>
    );
  }
};
export default WordCollection;

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
    fontSize: 20,
    color: "#000",
    marginBottom: 20,
    marginTop: 40,
    fontFamily: "PT-Bold",
    alignSelf: "center",
  },
  content: {
    marginLeft: 20,
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
    borderWidth: 1,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    backgroundColor: "white",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
    shadowColor: "#000",
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
 