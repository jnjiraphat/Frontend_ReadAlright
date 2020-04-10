import { TouchableOpacity, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ListItem } from "react-native-elements";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
} from "react-native";
import ReadingApi from "../API/ReadingAPI";
import { FlatGrid } from "react-native-super-grid";
import Constants from "expo-constants";
import Header from "../components/Header";

import SwitchType from "../components/SwitchType";
import NewReading from "../components/NewReading";

const arrayReading = [];

// const arrayId = [];

const About = (props) => {
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
  }, []);

  // const [check, setCheck] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  const [result, setResult] = useState([]);

  const goToArticle = (categoryId) => {
    Actions.Article({ text: categoryId });
  };

  const getReadaingByCateId = async () => {
    for (let index = 0; index < 3; index++) {
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

  const tabSwitch = [{ title: "Reading" }, { title: "Vocabulary" }];

  if (result) {
    return (
      <View style={styles.container}>
        <Header tabs={tabSwitch} />
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

        <FlatGrid
        // itemDimension={110}
        // items={cate}
        // style={styles.gridView}
        // renderItem={({ item }) => (
        // <TouchableOpacity onPress={() => goToArticle(item.category_id)}>
        //   <Card containerStyle={styles.itemContainer}>
        //     <View style={{ alignItems: "center" }}>
        //       {/* <Text style={styles.itemTopic}>{item.category_id}</Text> */}

        //       <Text style={styles.itemTopic}>{item.categoryName}</Text>
        //     </View>
        //   </Card>
        // </TouchableOpacity>
        // )}
        />
      </View>
    );
  } else {
    return <Text>Loading</Text>;
  }
};
export default About;

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
