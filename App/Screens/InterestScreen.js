import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  FlatList
} from "react-native";
import { Card, Button } from "react-native-elements";
import { Grid, Col, Row } from "react-native-easy-grid";
import { FlatGrid } from "react-native-super-grid";
import ReadingApi from "../API/ReadingAPI";
import { List, ListItem } from "react-native-elements";
import { Actions } from "react-native-router-flux";

const ImageCards = () => {
  return <Image />;
};

const Interest = () => {
  const [result, setResult] = useState([]);
  const read = async () => {
    const data = await ReadingApi();
    setResult(data);
    // console.log(data);
    // console.log("-----------------")
    // console.log(result)
  };
  console.log(result);
  useEffect(() => {
    read();
  }, []);

  const [view, setview] = useState(0);

  if (result) {
    console.log("Eiei");
    console.log(result);
    console.log("Mookkkkkkkkk");
    console.log(result.length);

    const goToAbout = () => {
      Actions.about();
    };

    return (
      <ScrollView>
        <Grid>
          <Row>
            <TouchableOpacity style={{ margin: 50 }} onPress={goToAbout}>
              <Text>Click to go to about</Text>
            </TouchableOpacity>
          </Row>
          <Row>
            <View style={styles.container}>
              <View style={styles.container}>
                <Text style={styles.topic}>Interest</Text>
                <Text style={styles.descript}>
                  Please select 3 that you interests
                </Text>
              </View>
            </View>
          </Row>
          <Row>
            <View style={styles.container}></View>
          </Row>

          <FlatGrid
            itemDimension={110}
            items={result}
            style={styles.gridView}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => setview(view + 1)}>
                <Card containerStyle={styles.itemContainer}>
                  <View style={{ alignItems: "center" }}>
                    <Text style={styles.itemTopic}>{item.categoryName}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            )}
          />
          <Row style={styles.container}>
            <Button title="Next" buttonStyle={styles.button} />
            <Text>Your clicks: {view}</Text>
          </Row>
        </Grid>
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
  } else {
    return <Text>Loading</Text>;
  }
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
  },
  button: {
    width: 200,
    marginTop: 20,
    marginBottom: 20
  }
});
