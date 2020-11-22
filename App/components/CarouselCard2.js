import React from "react";
import { FlatList, View } from "react-native";
import TimelineCard2 from "../components/TimelineCard2";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";

const CarouselCard2 = (props) => {
  function goToContentScreen(readingId) {
    console.log(readingId);
    Actions.ContentScreen({ text: readingId });

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
        <TouchableOpacity onPress={() => goToContentScreen(item.reading_id)}>
        <View style={{ height: 200 }}>
          <TimelineCard2
            image={item.image}
            title={item.title}
            imgHeight={92}
            width={180}
            titleHeight={40}
          />
        </View>
        </TouchableOpacity>
      )}
      keyExtractor = { (item, index) => index.toString() }
    />
  );
};

export default CarouselCard2;
