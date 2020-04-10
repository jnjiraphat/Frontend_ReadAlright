import React from "react";
import { FlatList, Dimensions, ScrollView } from "react-native";
import TimelineCard from "../components/TimelineCard";

const CarouselCard = (props) => {
  const { result, width, titleHeight, imgHeight } = props;
  return (
    // <ScrollView
    //   horizontal={true}
    //   showsHorizontalScrollIndicator={false}
    // >
    <FlatList
      // ref={(c) => { _carousel = c; }}
      // layout={"default"}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={result}
      renderItem={({ item }) => (
        <TimelineCard
          img={item.img}
          title={item.title}
          imgHeight={imgHeight}
          width={width}
          titleHeight={titleHeight}
        />
      )}
      keyExtractor={(item) => item.category_id}
    />
    // </ScrollView>
  );
};

export default CarouselCard;
