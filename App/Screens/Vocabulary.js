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

const Vocabulary = () => {

    // โค้ดส่วนเชื่อม Back นี้คือโค้ดของ Article
  // const [readingId, setReadingId] = useState(0);

  // function goToContentScreen(category_id,user_id,reading_id,vocabBox_id ) {
  //   const views =  CountViews(category_id,user_id,reading_id,vocabBox_id)
  //   console.log("readingIdddddddddddddddddddddd++++++++++++++")
  //   console.log(reading_id);
  //   Actions.ContentScreen({ text: reading_id });
  // }
  
  // const [cate, setCate] = useState([]);

  // const fetch = async () => {
  //   console.log("runningggggggggggggggggggggggggggggg");
  //   await axios
  //     .get("http://10.0.2.2:3000/reading/interest/" + props.text)
  //     .then(
  //       (response) => {
  //         console.log("eiei");
  //         console.log(response.data.reading);
  //         setCate(response.data.reading);
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  // };

  // const read = async () => {
  //   const data = await fetch();
  // };
  // useEffect(() => {
  //   read();
  // }, []);
  // console.log("This is id");
  // console.log(props.text);

  return (
    <ScrollView style={{
      marginTop: Constants.statusBarHeight}}>
      <View style={{alignSelf: "center",}}>
        <Text style={styles.category}>Sports</Text>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          data={data}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={{width:178}}>
              <TimelineCard
                title={item.title}
                img={item.img}
                imgHeight={167}
                width={167}
                titleHeight={78}
                fontSize={20}
                subTitle={item.subTitle}
              />
            </View>
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
  category : {
    marginTop: 44,
    fontSize: 24,
    fontFamily: "PT-Bold",
    color: "#000",
    alignSelf: "center",
    marginBottom: 26
  },
});
