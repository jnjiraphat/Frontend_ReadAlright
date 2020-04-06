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
import { Card, Button } from "react-native-elements";
import { Grid, Col, Row } from "react-native-easy-grid";
import { FlatGrid } from "react-native-super-grid";
import LevelLabel from "../components/LevelLabel";
import Header from "../components/Header"

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

  // const cateId = () => {
  //    arrayId.push(categoryId);
  //    console.log("push success!!!" + categoryId);
  // };

  // console.log("about page" + props.text[0])
  // console.log("about page" + props.text[1])
  // console.log("about page length" + props.text.length)

  const [result, setResult] = useState([]);

  const goToArticle = () => {
    Actions.Article({ text: categoryId });
  };

  const getReadaingByCateId = async () => {
    for (let index = 0; index < props.text.length; index++) {
      console.log("cateId = " + props.text[index]);

      const data = await axios
        .get("http://10.0.2.2:3000/reading/categorys/" + props.text[index])
        .then((response) => {
          console.log("round = " + [index]);
          for (let j = 0; j < response.data.reading.length; j++) {
            arrayReading.push(response.data.reading[j]);
          }
        });
    }
    console.log("array length" + arrayReading.length);
    setResult(arrayReading);
    // setCheck(true)
  };

  if (result) {
    // function logMapElements(value, key, map) {
    //    console.log(`m[${key}] = ${value}`);
    // }
    // var mapIter = props.text.keys();
    // console.log(mapIter.next().value);
    // console.log(mapIter.next().value);
    // console.log(props.text.size)

    // props.text.forEach(logMapElements);

    // var mapIter = props.text.values();
    // console.log(mapIter.next().value);
    // console.log(mapIter.next().value);
    // console.log(props.text.size)

    // const goToHome = () => {
    //    Actions.home()
    // }

    return (
      <ScrollView>
        <Header></Header>
        <Grid>
          {/* <Row>
                  <TouchableOpacity style={{ margin: 50 }} onPress={goToHome}>
                     <Text>Click to go to about</Text>
                  </TouchableOpacity>
               </Row> */}
          {/* <View>
                  {
                     result.map((result, index) => {
                        return <Text key={index}>
                           {result.title}
                        </Text>
                     })
                  }
               </View> */}
          {/* <LevelLabel /> */}
          <FlatGrid
            itemDimension={110}
            items={result}
            style={styles.gridView}
            renderItem={({ item }) => (
              <Card containerStyle={styles.itemContainer}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.itemTopic}>{item.title}</Text>
                </View>
              </Card>
            )}
          />
          <FlatGrid
            itemDimension={110}
            items={cate}
            style={styles.gridView}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPressIn={() => setCategoryId(item.category_id)}
                onPress={goToArticle}
              >
                <Card>
                  <View style={{ alignItems: "center" }}>
                    <Text style={styles.itemTopic}>{item.category_id}</Text>

                    <Text style={styles.itemTopic}>{item.categoryName}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            )}
          />
        </Grid>
      </ScrollView>

      // <TouchableOpacity style={{ margin: 50 }} onPress={goToHome}>
      //    <Text>This is ABOUT</Text>
      //    <FlatGrid
      //       itemDimension={110}
      //       items={result}
      //       style={styles.gridView}
      //       renderItem={({ item }) => (
      //         <TouchableOpacity
      //          //  onPressIn={() => setCategoryId(item.category_id)}
      //          //  onPress={views}
      //         >
      //           <Card containerStyle={styles.itemContainer}>
      //             <View style={{ alignItems: "center" }}>
      //               <Text style={styles.itemTopic}>{item.categoryName}</Text>
      //             </View>
      //           </Card>
      //         </TouchableOpacity>
      //       )}
      //     />
      // </TouchableOpacity>
    );
  } else {
    return <Text>Loading</Text>;
  }
};
export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gridView: {
    marginTop: 200,
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
