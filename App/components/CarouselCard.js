import React from "react";
import { FlatList, View } from "react-native";
import TimelineCard from "../components/TimelineCard";

const CarouselCard = (props) => {
  const { result } = props;
  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={result}
      refreshing={true}
      renderItem={({ item }) => (
        <View style={{ height: 200 }}>
          <TimelineCard
            img={item.img}
            title={item.title}
            imgHeight={92}
            width={180}
            titleHeight={40}
          />
        </View>
      )}
      keyExtractor={(item) => item.category_id}
    />
  );
};

export default CarouselCard;
