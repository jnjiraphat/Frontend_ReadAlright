import { TouchableOpacity, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,

} from "react-native";
import ReadingApi from "../API/ReadingAPI";
import Constants from "expo-constants";
import Header from "../components/Header";
import NewReading from "../components/NewReading";
import TimelineCard from "../components/TimelineCard";
import VocabCateApi from "../API/VocabCateAPI";
import * as firebase from "firebase";


import CarouselCard from "../components/CarouselCard";

import CategoryCard from "../components/CategoryCard";
import ButtonClick from "../components/ButtonClick";
import NewVocab from "../API/NewVocabAPI";
import CarouselCardVocab from "../components/CarouselCardVocab";
import CategoryCardVocab from "../components/CategoryCardVocab";
import { out } from "react-native/Libraries/Animated/src/Easing";
import LoadingScreen from './LoadingScreen'
import { AsyncStorage } from "react-native";

const arrayReading = [];

// const arrayId = [];




const home = (props) => {
  const [cate, setCate] = useState([]);
  const read = async () => {
    const data = await ReadingApi();
    setCate(data);
  };
  const [cateVocabBox, setCateVocabBox] = useState([]);
  const vocab = async () => {
    const word = await VocabCateApi();
    setCateVocabBox(word);
  };


  const [newVocab, setNewVocab] = useState([]);
  const newvocab = async () => {
    const newword = await NewVocab();

    setNewVocab(newword);
  };


  const [resultNew, setResultNew] = useState([]);
  const getNewReading = async () => {
    const data = await axios
      .get("http://10.0.2.2:3000/newReading")
      .then((response) => {
        setResultNew(response.data);
      });
  };

  const [MaybeVb, setMaybeVb] = useState([]);
  const getMaybeVb = async () => {

    try {
      var output = []
      for (let index = 0; index < props.text.length; index++) {
        const data = await axios
          .get("http://10.0.2.2:3000/vocabBox/maybeYouLike/" + props.text[index])
          .then((response) => {
            for (let j = 0; j < response.data.reading.length; j++) {
              output.push(response.data.reading[j])
            }

          });
      }
    } catch (error) {

    } finally {
      setMaybeVb(output);

    }


  };
  const [suggestion, setSuggestion] = useState([]);


  const getSuggestion = async () => {
    const data = await axios
      .get("http://10.0.2.2:3000/answer/suggestions/" + userId)
      .then((response) => {
        console.log("sug in home")
        console.log(response.data.answer)
        setSuggestion(response.data.answer)

      });
  };

  console.log("suggestion in home")
  console.log(suggestion)


  useEffect(() => {
    getUid();
    read();
    getReadaingByCateId();
    getNewReading();
    vocab();
    newvocab();
    getMaybeVb();
  }, []);
  const [uuid, setUuid] = useState("");
  const [userId, setUserId] = useState("");

  async function getUid() {
    var uid = firebase.auth().currentUser.uid;
    console.log("uid home = ", uid)
    setUuid(uid);
    getUser(uid)
  }

  const getUser = async (uuidTemp) => {
    try {
      console.log("Get UuidTemp in home");
      console.log(uuidTemp);
      await axios.get("http://10.0.2.2:3000/user/" + uuidTemp).then(
        (response) => {
          console.log("id user in home");
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
      console.log("error get userId5")
    }
  }
  

  // const clearAppData = async function () {
  //   try {
  //     const keys = await AsyncStorage.getAllKeys();
  //     await AsyncStorage.multiRemove(keys);
  //     console.log("clear already")
  //   } catch (error) {
  //     console.error('Error clearing app data.');
  //   } 
  // }
  
  // async function clearAsyncStorage() {
  //   await AsyncStorage.removeItem('uid');
  //   // await AsyncStorage.clear();
  // }

  function goToContentScreen(readingId) {
    Actions.ContentScreen({ text: readingId });

  }

  // const [check, setCheck] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  const [result, setResult] = useState([]);

  function ContentDefault() {
    if (resultNew.length == 0 && result.length == 0 && cate.length == 0) {

      return (
        <View style={{ flex: 1 }}>
          <LoadingScreen></LoadingScreen>
        </View>
      )


    } else {

      return (

        <View style={styles.ContentSwitch}>
          <View style={styles.ContentCarousel}>
           
            <Text style={styles.topic}>News!</Text>
            <CarouselCard result={resultNew} />
          </View>
          <View style={styles.ContentCarousel}>
            <Text style={styles.topic}>Maybe you like</Text>
            <CarouselCard result={result} />
          </View>
          <View style={styles.ContentCategory}>
            <Text style={[styles.topic, { marginLeft: "5%" }]}>Category</Text>
            <CategoryCard result={cate} />
          </View>
        </View>
      );

    }

  }

  function ContentChange() {
    return (
      <View>
        <View style={styles.ContentSwitch}>
          <View style={styles.ContentCarousel}>
            <Text style={styles.topic}>New!</Text>
            <CarouselCardVocab result={newVocab} />
          </View>
          <View style={styles.ContentCarousel}>
            <Text style={styles.topic}>Maybe you like</Text>
            <CarouselCardVocab result={MaybeVb} />
          </View>
          <View style={styles.ContentCategoryVocab}>
            <Text style={[styles.topic, { marginLeft: "5%" }]}>Category</Text>
            <CategoryCardVocab result={cateVocabBox} />
          </View>
        </View>
      </View>
    );
  }

  const getReadaingByCateId = async () => {
    const data = await axios
      .get("http://10.0.2.2:3000/reading/user/1")
      .then((response) => {
        setResult(response.data.reading);
      });

    // console.log("array length" + arrayReading.length);
    // setCheck(true)
  };


  const tabSwitch = [{ title: "Reading" }, { title: "Vocabulary" }];
  if (result && suggestion) {
    return (
      <View style={styles.container}>
        <Header
          tabs={tabSwitch}
          ContentDefault={ContentDefault()}
          ContentChange={ContentChange()}
          suggestion={suggestion}
          isSwitch={true}
        />
        {/*เดะ
        <SwitchType tabs={tabSwitch} /> */}
        {/* <Row>
                  <TouchableOpacity style={{ margin: 50 }} onPress={goToHome}>
                     <Text>Click to go to about</Text>
                  </TouchableOpacity>
               </Row> */}
        {/* <NewReading></NewReading> */}

        {/* <FlatGrid
          itemDimension={110}
          items={result}
          style={styles.gridView}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Card containerStyle={styles.itemContainer}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.itemTopic}>{item.title}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        /> */}
      </View>
    );
  } else {
    return <View style={{ flex: 1 }}>
      <LoadingScreen />
    </View>;
  }
};
export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  gridView: {
    // marginTop: 200,
    flex: 1,
  },
  itemContainer: {
    borderRadius: 5,
    height: 110,
    width: 110,
    overflow: "hidden",
  },
  topic: {
    fontSize: 18,
    color: "#000",
    fontFamily: "PT-Bold",
  },
  itemTopic: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  ContentSwitch: {
    flex: 1,
  },
  ContentCarousel: {
    height: 250,
    marginLeft: "5%",
  },
  ContentCategory: {
    justifyContent: "center",
    // marginBottom: 100,
  },
  ContentCategoryVocab: {
    justifyContent: "center",
    marginBottom: 100,
  }
});
