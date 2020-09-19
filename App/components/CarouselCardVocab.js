import React from "react";
import { FlatList, View } from "react-native";
import TimelineCard from "../components/TimelineCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";

const CarouselCardVocab = (props) => {
  function goToContentVocab(vocabBox_id) {
    console.log(vocabBox_id);
    Actions.ContentVocab({ text: vocabBox_id });

    console.log("hello");
  }
  const { result } = props;
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={result}
      
      // initialNumToRender={5}
      // contentContainerStyle={{ flexGrow: 1, flexDirection: "row" }}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => goToContentVocab(item.vocabBox_id)}>
        <View style={{ height: 200 }}>
          <TimelineCard
            img={item.image}
            title={item.boxEngName}
            imgHeight={92}
            width={180}
            titleHeight={40}
          />
        </View>
        </TouchableOpacity>
      )}
      // keyExtractor={(item) => item.category_id}
    />
  );
};

export default CarouselCardVocab;
