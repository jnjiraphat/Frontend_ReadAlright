import React from "react";
import { FlatList, View } from "react-native";
import TimelineCard from "../components/TimelineCard";

const CategoryCard = (props) => {
  const { result } = props;
  return (
    <FlatList
      numColumns={2}
      data={result}
      contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      renderItem={({ item }) => (
        <View>
          <TimelineCard
            img={item.img}
            title={item.title}
            imgHeight={102}
            width={162.75}
            titleHeight={40}
          />
        </View>
      )}
      // keyExtractor={(item) => item.category_id}
    />
  );
};
export default CategoryCard;
