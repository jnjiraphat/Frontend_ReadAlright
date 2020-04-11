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
} from "react-native";
import ReadingApi from "../API/ReadingAPI";
import Constants from "expo-constants";
import Header from "../components/Header";
// import FlatGrid from "react-native-super-grid";
import { Card, Button } from "react-native-elements";

import NewReading from "../components/NewReading";
import TimelineCard from "../components/TimelineCard";
// import BottomNavigation from "../components/BottomNavigation"
import CarouselCard from "../components/CarouselCard";

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

  useEffect(() => {
    read();
    getReadaingByCateId();
    getNewReading();

  }, []);

  // const [check, setCheck] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [resultNew, setResultNew] = useState([]);

  const [results, setResult] = useState([]);

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
      <View style={{ flex: 1 }}>
        <View style={{ height: 200 }}>
          <Text>New!</Text>
          <CarouselCard result={resultNew} />
        </View>
        <View style={{ height: 200 }}>
          <Text>Maybe you like</Text>
          <CarouselCard result={results} />
        </View>
      </View>
    );
  }

  function ContentChange() {
    return (
      <View>
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

        <View style={{ flex: 1 }}>
          <View style={{ height: 200 }}>
            <Text>New!</Text>
            <CarouselCard result={vb} />
          </View>
          <View style={{ height: 200 }}>
            <Text>Maybe you like</Text>
            <CarouselCard result={vb} />
          </View>
        </View>
      </View>
    );
  }

  const goToArticle = (categoryId) => {
    Actions.Article({ text: categoryId });
  };

  const getReadaingByCateId = async () => {
    for (let index = 0; index < props.text.length; index++) {
      console.log("cateId = " + props.text[index]);

      const data = await axios
        .get("http://10.0.2.2:3000/reading/categorys/" + props.text[index])
        .then((response) => {
          console.log("round = " + [index]);
          for (let j = 0; j < 3; j++) {
            arrayReading.push(response.data.reading[j]);
          }
        });
    }
    console.log("array length" + arrayReading.length);
    setResult(arrayReading);
    // setCheck(true)
  };
  const getNewReading = async () => {
    const data = await axios
      .get("http://10.0.2.2:3000/newReading")
      .then((response) => {
        console.log("Newreadingggggggggggggggggggggggggggggggggg");
        console.log(response.data.length);
        console.log("Newreadingggggggggggggggggggggggggggggggggg");

        setResultNew(response.data);
      });
  };

  const tabSwitch = [{ title: "Reading" }, { title: "Vocabulary" }];
  if (results) {
    return (
      <View style={styles.container}>
        <Header
          tabs={tabSwitch}
          ContentDefault={ContentDefault()}
          ContentChange={ContentChange()}
        />
        {/* 
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

        {/* <BottomNavigation></BottomNavigation> */}
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
    fontSize: 20,
    color: "#000",
    marginTop: 50,
    fontWeight: "bold",
  },
  descript: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
  itemTopic: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  button: {
    width: 200,
    marginTop: 20,
    marginBottom: 20,
  },
});
