import React from "react";
import { FlatList, View } from "react-native";
import TimelineCard from "../components/TimelineCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";

const CarouselCard = (props) => {
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
        <View style={{ height: 220 }}>
          <TimelineCard
            img={item.image}
            title={item.title}
            imgHeight={92}
            width={180}
            titleHeight={60}
            isLevel={true}
            level_reading={item.level_reading}
          />
        </View>
        </TouchableOpacity>
      )}
      // keyExtractor={(item) => item.category_id}
    />
  );
};

export default CarouselCard;
