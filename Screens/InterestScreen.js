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
  { name: "TURQUOISE", code: "#1abc9c", img: require("./../assets/img1.png") },
  { name: "EMERALD", code: "#2ecc71", img: require("./../assets/img1.png") },
  {
    name: "PETER RIVER",
    code: "#3498db",
    img: require("./../assets/img1.png")
  },
  { name: "AMETHYST", code: "#9b59b6", img: require("./../assets/img1.png") },
  {
    name: "WET ASPHALT",
    code: "#34495e",
    img: require("./../assets/img1.png")
  },
  { name: "GREEN SEA", code: "#16a085", img: require("./../assets/img1.png") },
  { name: "NEPHRITIS", code: "#27ae60", img: require("./../assets/img1.png") },
  {
    name: "BELIZE HOLE",
    code: "#2980b9",
    img: require("./../assets/img1.png")
  },
  { name: "WISTERIA", code: "#8e44ad", img: require("./../assets/img1.png") },
  {
    name: "MIDNIGHT BLUE",
    code: "#2c3e50",
    img: require("./../assets/img1.png")
  },
  { name: "SUN FLOWER", code: "#f1c40f", img: require("./../assets/img1.png") },
  { name: "CARROT", code: "#e67e22", img: require("./../assets/img1.png") },
  { name: "ALIZARIN", code: "#e74c3c", img: require("./../assets/img1.png") },
  { name: "CLOUDS", code: "#ecf0f1", img: require("./../assets/img1.png") },
  { name: "CONCRETE", code: "#95a5a6", img: require("./../assets/img1.png") },
  { name: "ORANGE", code: "#f39c12", img: require("./../assets/img1.png") },
  { name: "PUMPKIN", code: "#d35400", img: require("./../assets/img1.png") },
  {
    name: "POMEGRANATE",
    code: "#c0392b",
    img: require("./../assets/img1.png")
  },
  { name: "SILVER", code: "#bdc3c7", img: require("./../assets/img1.png") }
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
