import { TouchableOpacity, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import ReadingApi from "../API/ReadingAPI";
import { Card } from "@ant-design/react-native";
import Constants from "expo-constants";
import Header from "../components/Header";
import NewReading from "../components/NewReading";
import TimelineCard from "../components/TimelineCard";
import VocabCateApi from "../API/VocabCateAPI";

import CarouselCard from "../components/CarouselCard";
import CarouselCard2 from "../components/CarouselCard2";

import CategoryCard from "../components/CategoryCard";
import ButtonClick from "../components/ButtonClick";
import NewVocab from "../API/NewVocabAPI";
import CarouselCardVocab from "../components/CarouselCardVocab";
import CategoryCardVocab from "../components/CategoryCardVocab";

const arrayReading = [];

// const arrayId = [];




const home = (props) => {
  console.log("This is props");
  console.log(props.text);
  const [cate, setCate] = useState([]);
  const read = async () => {
    const data = await ReadingApi();
    setCate(data);
  };
  console.log("This is category");
  console.log(cate);

  const [cateVocabBox, setCateVocabBox] = useState([]);
  const vocab = async () => {
    const word = await VocabCateApi();
    setCateVocabBox(word);
  };
  console.log("This is vocabBox");
  console.log(cateVocabBox);

  const [newVocab, setNewVocab] = useState([]);
  const newvocab = async () => {
    const newword = await NewVocab();
    console.log("--------------vocab-----------------");
    console.log(newword);
    console.log("--------------vocab-----------------");

    setNewVocab(newword);
  };
  console.log("This is newVocab");
  console.log(newVocab);

  const [resultNew, setResultNew] = useState([]);
  const getNewReading = async () => {
    const data = await axios
      .get("http://10.0.2.2:3000/newReading")
      .then((response) => {
        console.log("Newreadingggggggggggggggggggggggggggggggggg");
        console.log(response.data.length);
        console.log(response.data);
        console.log("Newreadingggggggggggggggggggggggggggggggggg");

        setResultNew(response.data);
      });
  };
  const [suggestion, setSuggestion] = useState([]);


  const getSuggestion = async () => {
    const data = await axios
      .get("http://10.0.2.2:3000/answer/suggestions/1")
      .then((response) => {
        console.log("Suggestion");
        // console.log(response.data.length);
        console.log(response.data.answer);
        console.log("Suggestion");

        setSuggestion(response.data.answer)

      });
  };
  useEffect(() => {
    read();
    getReadaingByCateId();
    getNewReading();
    vocab();
    newvocab();
    getSuggestion();
  }, []);

  function goToContentScreen(readingId) {
    console.log(readingId);
    Actions.ContentScreen({ text: readingId });

    console.log("hello");
  }

  // const [check, setCheck] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  const [result, setResult] = useState([]);

  const rd = [
    { title: "Reading", img: require("./../assets/catagory/Animal.jpg") },
    { title: "Vocabulary", img: require("./../assets/catagory/Animal.jpg") },
    { title: "Reading", img: require("./../assets/catagory/Animal.jpg") },
    { title: "Vocabulary", img: require("./../assets/catagory/Animal.jpg") },
    { title: "Reading", img: require("./../assets/catagory/Animal.jpg") },
    { title: "Vocabulary", img: require("./../assets/catagory/Animal.jpg") },
  ];

  const vb = [
    { title: "Reading", img: require("./../assets/catagory/News.jpg") },
    { title: "Vocabulary", img: require("./../assets/catagory/News.jpg") },
    { title: "Reading", img: require("./../assets/catagory/News.jpg") },
    { title: "Vocabulary", img: require("./../assets/catagory/News.jpg") },
    { title: "Reading", img: require("./../assets/catagory/News.jpg") },
    { title: "Vocabulary", img: require("./../assets/catagory/News.jpg") },
  ];

  function ContentDefault() {
    return (
      <View style={styles.ContentSwitch}>
        <View style={styles.ContentCarousel}>
          <Text style={styles.topic}>News!</Text>
          <CarouselCard result={resultNew} />
        </View>
        <View style={styles.ContentCarousel}>
          <Text style={styles.topic}>Maybe you like</Text>
          <CarouselCard2 result={result} />
        </View>
        <View style={styles.ContentCategory}>
          <Text style={[styles.topic, { marginLeft: "5%" }]}>Category</Text>
          <CategoryCard result={cate} />
        </View>
        <ButtonClick
          text="Challenge"
          fontSize={24}
          fontFamily="PT-Bold"
          fontcolor="#000000"
          height={39}
          width={245}
          radius={30}
          padding={0}
          marginTop={Dimensions.get("window").height / 16}
          marginBottom={Dimensions.get("window").height / 7}
          // onPressAction={goToHome}
          // shadowRadius={30}
          colorsStart="#7EF192"
          colorsEnd="#2DC897"
        />
      </View>
    );
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
            <CarouselCard result={vb} />
          </View>
          <View style={styles.ContentCategory}>
            <Text style={[styles.topic, { marginLeft: "5%" }]}>Category</Text>
            <CategoryCardVocab result={cateVocabBox} />
          </View>
          <ButtonClick
            text="Challenge"
            fontSize={24}
            fontFamily="PT-Bold"
            fontcolor="#000000"
            height={39}
            width={245}
            radius={30}
            padding={0}
            marginTop={Dimensions.get("window").height / 16}
            marginBottom={Dimensions.get("window").height / 7}
            // onPressAction={goToHome}
            // shadowRadius={30}
            colorsStart="#7EF192"
            colorsEnd="#2DC897"
          />
        </View>
      </View>
    );
  }

  const getReadaingByCateId = async () => {
    const data = await axios
      .get("http://10.0.2.2:3000/reading/user/1")
      .then((response) => {
        // console.log("------------mookkakeiei-------------");
        console.log(response.data.reading);
        console.log("-------------------------abcdef");
        // console.log("round = " + [index]);
        // for (let j = 0; j < response.data.reading.length; j++) {
        //   arrayReading.push(response.data.reading[j]);
        // }
        setResult(response.data.reading);
      });

    // console.log("array length" + arrayReading.length);
    // setCheck(true)
  };

  const tabSwitch = [{ title: "Reading" }, { title: "Vocabulary" }];
  if (result&&suggestion) {
    return (
      <View style={styles.container}>
        <Header
          tabs={tabSwitch}
          ContentDefault={ContentDefault()}
          ContentChange={ContentChange()}
          suggestion={suggestion}
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
    return <Text>Loading</Text>;
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
    height: 200,
    marginLeft: "5%",
  },
  ContentCategory: {
    justifyContent: "center",
    // marginBottom: 100,
  },
});
