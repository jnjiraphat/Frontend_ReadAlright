import { TouchableOpacity, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ListItem } from "react-native-elements";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
} from "react-native";
import ReadingApi from "../API/ReadingAPI";
import { Card, Button } from "react-native-elements";
import { FlatGrid } from "react-native-super-grid";
import Constants from "expo-constants";


const newReading = (props) => {
  const [resultNew, setResultNew] = useState([]);

  useEffect(() => {
    getNewReading();
  }, []);

  const getNewReading = async () => {
    const data = await axios
      .get("http://10.0.2.2:3000/newReading")
      .then((response) => {
        console.log("Newreadingggggggggggggggggggggggggggggggggg");
        console.log(response.data.length);
        console.log("Newreadingggggggggggggggggggggggggggggggggg");

        setResultNew(response.data);
      });
  };
  if (resultNew) {
    return (
      <View style={styles.container}>

        {/* <SwitchType /> */}
        {/* <Row>
                  <TouchableOpacity style={{ margin: 50 }} onPress={goToHome}>
                     <Text>Click to go to about</Text>
                  </TouchableOpacity>
               </Row> */}
        
        <FlatGrid
          itemDimension={110}
          items={resultNew}
          style={styles.gridView}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Card containerStyle={styles.itemContainer}>
                <View style={{ alignItems: "center" }}>
                  <Text style={styles.itemTopic}>{item.title}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  } else {
    return <Text>Loading</Text>;
  }
};
export default newReading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  gridView: {
    // marginTop: 200,
    flex: 1,
  },
  itemContainer: {
    borderRadius: 5,
    height: 110,
    width: 110,
    overflow: "hidden",
  },
  topic: {
    fontSize: 20,
    color: "#000",
    marginTop: 50,
    fontWeight: "bold",
  },
  descript: {
    fontSize: 16,
    color: "#000",
    fontWeight: "600",
  },
  itemTopic: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  button: {
    width: 200,
    marginTop: 20,
    marginBottom: 20,
  },
});
