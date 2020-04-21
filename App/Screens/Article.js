import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import ReadingApi from "../API/ReadingAPI";
import { FlatGrid } from "react-native-super-grid";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
} from "react-native";
import axios from "axios";
import TimelineCard from "../components/TimelineCard";
import CountViews from "../API/CountViewsAPI"

const Article = (props) => {
  const [readingId, setReadingId] = useState(0);

  function goToContentScreen(category_id,user_id,reading_id,vocabBox_id ) {
    const views =  CountViews(category_id,user_id,reading_id,vocabBox_id)
    console.log(readingId);
    Actions.ContentScreen({ text: reading_id });

    console.log("hello");
  }
  
  const [cate, setCate] = useState([]);

  const fetch = async () => {
    console.log("runningggggggggggggggggggggggggggggg");
    await axios
      .get("http://10.0.2.2:3000/reading/categorys/" + props.text)
      .then(
        (response) => {
          console.log("eiei");
          console.log(response.data.reading);
          setCate(response.data.reading);
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
  console.log("This is id");
  console.log(props.text);

  // const goToAbout = () => {
  //    Actions.about()
  // }
  return (
    <FlatList
      numColumns={2}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      data={cate}
      renderItem={({ item }) => (
        <View>
          <TouchableOpacity onPress={() => goToContentScreen(item.category_id,1,item.reading_id,1)} >
            <TimelineCard
              img={item.image}
              title={item.title}
              imgHeight={102}
              width={162.75}
              titleHeight={40}
            />
          </TouchableOpacity>
        </View>
        // <ListItem
        //   onPressIn={() => setReadingId(item.reading_id)}
        //   onPress={goToContentScreen}
        //   key={item.category_id}
        //   title={item.title}
        //   leftIcon={{ name: item.icon }}
        //   bottomDivider
        //   chevron
        // />
      )}
    />
  );
};
export default Article;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
});
