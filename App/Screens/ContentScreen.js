import React, { useEffect, useState } from "react";
import { Actions } from "react-native-router-flux";
import ReadingApi from "../API/ReadingAPI";
import { FlatGrid } from "react-native-super-grid";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
  Dimensions,
  Text,
  Image,
} from "react-native";
import ButtonClick from "../components/ButtonClick";

import Constants from "expo-constants";
import axios from "axios";

const Content = (props) => {
  const [cate, setCate] = useState([]);

  const fetch = async () => {
    console.log("runningggggggggggggggggggggggggggggg");
    await axios
      .get("http://10.0.2.2:3000/reading/readingId/" + props.text)
      .then(
        (response) => {
          console.log("eieiContent");
          console.log(response.data.reading);
          setCate(response.data.reading);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const testData = [
    {
      content: "YOOOO",
      topic: "Name's Topic",
      img: require("./../assets/catagory/Animal.jpg"),
    },
  ];

  const read = async () => {
    const data = await fetch();
  };
  useEffect(() => {
    read();
  }, []);
  console.log("This is reading id");
  console.log(props.text);

  // const goToAbout = () => {
  //    Actions.about()
  // }
  return (
    <ScrollView>
      <FlatList
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        data={testData}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Image source={item.img} style={styles.headerImg} />
            <Text style={styles.topic}>{item.topic}</Text>
            <View style={styles.whiteCard}>
              <Text style={styles.content}>{item.content}</Text>
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
              marginTop={20}
              marginBottom={40}
              // onPressAction={goToHome}
              // shadowRadius={30}
              colorsStart="#2DC897"
              colorsEnd="#7EF192"
            />
          </View>
        )}
      />
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
    marginVertical: 20,
    fontFamily: "PT-Bold",
  },
  content: {
    fontSize: 16,
    color: "#000",
    fontFamily: "PT-Reg",
  },
  itemTopic: {
    fontSize: 14,
    color: "#000",
    fontFamily: "PT-Bold",
  },

  headerImg: {
    height: Dimensions.get("window").height / 3.5,
  },

  //whiteCard
  whiteCard: {
    // flex: 1,
    width: Dimensions.get("window").width / 1.15,
    // justifyContent: "center",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: "#ffffff",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
    marginBottom: "10%",
    paddingVertical: 20,
  },
});
