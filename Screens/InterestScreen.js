import React, { useState } from "react";
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
import { Card } from "react-native-elements";
import { Grid, Col, Row } from "react-native-easy-grid";
import { FlatGrid } from "react-native-super-grid";

const items = [
  {
    name: "Music",
    img: require("./../assets/catagory/music.png")
  },
  { name: "Movie", img: require("./../assets/catagory/movie.png") },
  {
    name: "News",
    img: require("./../assets/catagory/news.png")
  },
  { name: "Animal", img: require("./../assets/catagory/animal.png") },
  {
    name: "Food",
    img: require("./../assets/catagory/food.png")
  },
  { name: "Story", img: require("./../assets/catagory/story.png") },
  {
    name: "House",
    img: require("./../assets/catagory/house.png")
  },
  {
    name: "Natural",
    img: require("./../assets/catagory/natural.png")
  },
  { name: "Sport", img: require("./../assets/catagory/sport.png") }
];

const ImageCards = () => {
  return <Image />;
};

const Interest = () => {
  // const [count, setcount] = useState(0);

  return (
    <ScrollView>
      <Grid>
        <Row>
          <View style={styles.container}>
            <View style={styles.container}>
              <Text style={styles.topic}>Interest</Text>
              <Text style={styles.descript}>
                Please select 3 that you interest
              </Text>
            </View>
          </View>
        </Row>
        <Row>
          <View style={styles.container}></View>
        </Row>
      </Grid>
      <FlatGrid
        itemDimension={110}
        items={items}
        style={styles.gridView}
        renderItem={({ item, index }) => (
          <Card
            containerStyle={styles.itemContainer}
            image={item.img}
            imageStyle={{
              height: 75
              // backgroundColor: "red"

              // borderColor: "red",
              // borderTopLeftRadius: 5,
              // borderTopRightRadius: 5,
              // overflow: "hidden"
            }}
            imageProps={{ resizeMode: "cover" }}
          >
            <Text style={styles.itemTopic}>{item.name}</Text>
          </Card>
        )}
      />
      {/* <View style={styles.container}>
          <TouchableOpacity onPress={() => setcount(count + 1)}>
            <Image source={require("./../assets/icon.png")} />
          </TouchableOpacity>
          <Text>your clicks: {count}</Text>
          <Text>click</Text>
        </View> */}
      {/* <FlatGrid
          itemDimension={110}
          items={items}
          style={styles.gridView}
          renderItem={({ item, index }) => (
            <CardViewWithImage
              width={110}
              borderRadius={5}
              source={item.img}
              title={item.name}
              imageWidth={"100%"}
              imageHeight={100}
              roundedImage={false}
            />
          )}
        /> */}
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
    borderRadius: 5,
    height: 110,
    width: 110,
    overflow: "hidden"
  },
  topic: {
    fontSize: 20,
    color: "#000",
    marginTop: 50,
    fontWeight: "bold"
  },
  descript: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600"
  },
  itemTopic: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold"
  }
});
