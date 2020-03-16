import React, { useState } from "react";
import { Grid } from "@ant-design/react-native";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from "react-native";
import { FlatGrid } from "react-native-super-grid";

// const datalist = [
//   { image: require("./../assets/img1.png") },
//   { image: require("./../assets/img2.png") },
//   { image: require("./../assets/img1.png") },
//   { image: require("./../assets/img2.png") },
//   { image: require("./../assets/img1.png") },
//   { image: require("./../assets/img2.png") },
//   { image: require("./../assets/img1.png") },
//   { image: require("./../assets/img2.png") },
//   { image: require("./../assets/img2.png") }
// ];

// const data = Array.from(new Array(9)).map((_val, i) => ({
//   image: require("./../assets/img1.png"),
//   text: `name${i}`
// }));

const items = [
  {
    name: "Entertainment",
    img: require("./../assets/catagory/entertainment.png")
  },
  { name: "Sport", img: require("./../assets/catagory/sport.png") },
  {
    name: "News",

    img: require("./../assets/catagory/news.png")
  },
  { name: "Animal", img: require("./../assets/catagory/animal.png") },
  {
    name: "Food",

    img: require("./../assets/catagory/food.png")
  },
  { name: "Tale", img: require("./../assets/catagory/tale.png") },
  {
    name: "Announce & Brochure",
    img: require("./../assets/catagory/announce.png")
  },
  {
    name: "Home",

    img: require("./../assets/catagory/home.png")
  },
  { name: "Clothing", img: require("./../assets/catagory/clothing.png") }
];

const Interest = () => {
  // const [count, setcount] = useState(0);

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <View style={styles.container}>
          <TouchableOpacity onPress={() => setcount(count + 1)}>
            <Image source={require("./../assets/icon.png")} />
          </TouchableOpacity>
          <Text>your clicks: {count}</Text>
          <Text>click</Text>
        </View> */}
        <FlatGrid
          itemDimension={130}
          items={items}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          // spacing={20}
          renderItem={({ item, index }) => (
            <ImageBackground
              source={item.img}
              style={styles.itemContainer}
              imageStyle={{ borderRadius: 5 }}
            >
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>{item.code}</Text>
            </ImageBackground>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Interest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  gridView: {
    marginTop: 20,
    flex: 1
  },
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600"
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff"
  }
});
