import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import ReadingApi from "../API/ReadingAPI";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
} from "react-native";
import axios from "axios";
import CountViews from "../API/CountViewsAPI"
import TimelineCard from "../components/TimelineCard";
import Constants from "expo-constants";
import Header from "../components/Header";

const data = [
  {
    img: "https://i.pinimg.com/originals/cf/7e/12/cf7e12886b090989aee2ff50288bd8e6.png",
    title: "Haruichi",
    subTitle: "แฟนคุณเจน"
  },
  {
    img: "https://vignette.wikia.nocookie.net/diamondnoace/images/9/96/Haruichi_Act_2.png/revision/latest?cb=20190709155009",
    title: "Haruichi"
  },
  {
    img: "https://vignette.wikia.nocookie.net/diamondnoace/images/3/3c/HaruichiColor2.jpg/revision/latest?cb=20140225021021",
    title: "Haruichi"
  },
  {
    img: "https://pbs.twimg.com/media/EAcFPT_WwAEtf9-.jpg",
    title: "Haruichi"
  },
  {
    img: "https://thumbs.gfycat.com/DistantSkeletalImago-small.gif",
    title: "Haruichi"
  },
  {
    img: "https://cdn-us.anidb.net/images/main/142297.jpg",
    title: "Haruichi"
  },
]

const Vocabulary = (props) => {
  const [result, setResult] = useState([]);


  const fetch = async () => {
    console.log("runningggggggggggggggggggggggggggggg");
    await axios.get("http://10.0.2.2:3000/vocabBox/" + props.text).then(
      (response) => {
        console.log("eiei");
        console.log(response.data.reading);
        //     setCate(response.data.reading);
        //     // setCateName(response.data.reading[0].categoryName);
        //     console.log(cateName);
        setResult(response.data.reading)
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
    // getSuggestion();
  }, []);
  console.log("This is cate_id vocab");
  console.log(props.text);

  function goToContentVocab(vocabBox_id) {
    console.log("vocabBox_id   " + vocabBox_id);
    Actions.ContentVocab({ text: vocabBox_id });
    console.log("Finish " + vocabBox_id);
    // console.log("readingIDDDDDDDDDDDD" + reading_id);
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
        <Text style={styles.category}>Sports</Text>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          data={result}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => goToContentVocab(item.vocabBox_id)}>
            <View style={{ width: 178 }}>
              <TimelineCard
                title={item.boxEngName}
                img={item.img}
                imgHeight={167}
                width={167}
                titleHeight={78}
                fontSize={20}
                subTitle={item.subTitle}
              />
            </View>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* <FlatList
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        data={cate}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <ArticleCard 
              img={item.image}
              title={item.title}
            />
          </View>
        )}
      /> */}
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
