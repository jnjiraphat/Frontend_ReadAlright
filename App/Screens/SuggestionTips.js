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
import Constants from "expo-constants";
import Header from "../components/Header";
import VocabCateApi from "../API/VocabCateAPI";

import CarouselCard from "../components/CarouselCard";

import CategoryCard from "../components/CategoryCard";
import ButtonClick from "../components/ButtonClick";
import NewVocab from "../API/NewVocabAPI";
import CarouselCardVocab from "../components/CarouselCardVocab";
import CategoryCardVocab from "../components/CategoryCardVocab";

const home = (props) => {
  
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
    getSuggestion();
  }, []);

  

  function ContentDefault() {
    return (
      <View style={styles.ContentSwitch}>
          <Text style={styles.topic}>Suggestion</Text>
      </View>
    );
  }

  function ContentChange() {
    return (
      <View>
        <View style={styles.ContentSwitch}>
            <Text style={styles.topic}>Tips</Text>
          </View>
         </View>
    );
  }

  const tabSwitch = [{ title: "Suggestion" }, { title: "Tips" }];
  if (suggestion) {
    return (
      <View style={styles.container}>
        <Header
          tabs={tabSwitch}
          ContentDefault={ContentDefault()}
          ContentChange={ContentChange()}
          suggestion={suggestion}
          isSwitch={true}
        />
       
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
    padding: "5%"
  },
});
