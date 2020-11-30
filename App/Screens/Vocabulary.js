import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import ReadingApi from "../API/ReadingAPI";
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
} from "react-native";
import axios from "axios";
import TimelineCard from "../components/TimelineCard";
import Constants from "expo-constants";
import Header from "../components/Header";


const Vocabulary = (props) => {
  const [result, setResult] = useState([]);
  const [cateName, setCateName] = useState("");

  const fetch = async () => {
    console.log("runningggggggggggggggggggggggggggggg");
    await axios.get("https://readalright-backend.khanysorn.me/vocabBoxByCateID/" + props.text).then(
      (response) => {
        setResult(response.data.reading)
        setCateName(response.data.reading[0].categoryName);
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
  }, []);
  
  function goToContentVocab(vocabBox_id) {
    Actions.ContentVocab({ text: vocabBox_id });
  }

  const [suggestion, setSuggestion] = useState([]);

  return (
    <ScrollView style={{
      marginTop: Constants.statusBarHeight}}>
      <Header
        suggestion={suggestion}
        isSwitch={false}
      />
      <View style={{alignSelf: "center",}}>
        <Text style={styles.category}>{cateName}</Text>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={result}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => goToContentVocab(item.vocabBox_id)}>
            <View style={{ width: 178 }}>
              <TimelineCard
                title={item.boxEngName}
                img={item.image}
                imgHeight={167}
                width={167}
                titleHeight={78}
                fontSize={20}
                subTitle={item.subTitle}
              />
            </View>
            </TouchableOpacity>
          )}
          keyExtractor = { (item, index) => index.toString() }
        />
      </View>

  </ScrollView>
  );
};
export default Vocabulary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  gridView: {
    marginTop: 20,
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
  category: {
    marginTop: 44,
    fontSize: 24,
    fontFamily: "PT-Bold",
    color: "#000",
    alignSelf: "center",
    marginBottom: 26
  },
});
