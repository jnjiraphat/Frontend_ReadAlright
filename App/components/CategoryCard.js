import React from "react";
import { FlatList, View } from "react-native";
import TimelineCard from "../components/TimelineCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";

const CategoryCard = (props) => {
  function goToArticle(cateId) {
    Actions.Article({ text: cateId });
  }
  const { result } = props;
  return (
    <FlatList
      numColumns={2}
      data={result}
      contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => goToArticle(item.category_id)}>
          <View>
            <TimelineCard
              img={item.image}
              title={item.categoryName}
              imgHeight={102}
              width={162.75}
              titleHeight={40}
              
            />
          </View>
        </TouchableOpacity>
      )}
      keyExtractor = { (item, index) => index.toString() }
      />
  );
};
export default CategoryCard;
