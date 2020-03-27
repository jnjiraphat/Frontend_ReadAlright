import React, { useState, useEffect, useCallback } from "react";
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
import { List, ListItem } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import axios from "axios";

//API
import ReadingApi from "../API/ReadingAPI";
// import ViewsApi from "../API/ViewsAPI";
const arrayId = [];
const Interest = () => {
  //Fetch(GET) Catagory Name
  const [result, setResult] = useState([]);
  const read = async () => {
    const data = await ReadingApi();
    setResult(data);
  };
  useEffect(() => {
    read();
  }, []);

  //Fetch(POST) numOfViews
  const [categoryId, setCategoryId] = useState(0);
  const cateId = () => {
    arrayId.push(categoryId);
    console.log("push success!!!" + categoryId);
  };
  const views = e => {
    axios
      .post("http://10.0.2.2:3000/views", {
        numOfView: 1,
        category_id: categoryId,
        user_id: 1,
        reading_id: 1,
        vocabBox_id: 1
      })
      .then(
        response => {
          arrayId.push(categoryId);

          console.log("array length = " + arrayId.length);
          for (let index = 0; index < arrayId.length; index++) {
            const element = arrayId[index];
            console.log("index = " + [index] + "value = " + element);
          }
          // console.log("eiei");
          // console.log(response.data);
        },
        error => {
          console.log(error);
        }
      );
  };
  console.log(categoryId);

  //Selected category
  const [selected, setSelected] = useState(new Map());
  const onSelect = useCallback(
    categoryId => {
      const newSelected = new Map(selected);
      newSelected.set(categoryId, !selected.get(categoryId));
      setSelected(newSelected);
    },
    [selected]
  );
  const onCollect = () => {
    onSelect(categoryId);
  };

  if (result) {
    // console.log(result);
    // console.log(result.length);

    //Navigator
    const goToAbout = () => {
      Actions.about({ text: arrayId });
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

          {/* Render CatagoryName */}

          <FlatGrid
            itemDimension={110}
            items={result}
            style={styles.gridView}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPressIn={() => setCategoryId(item.category_id)}
                onPress={onCollect}
                selected={!!selected.get(item.id)}
                onSelect={onSelect}
              >
                <Card
                  containerStyle={[
                    styles.itemContainer,
                    {
                      backgroundColor: selected ? "#6e3b6e" : "#ffffff"
                    }
                  ]}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text style={styles.itemTopic}>{item.categoryName}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            )}
            extraData={selected}
          />
          <Row style={styles.container}>
            <Button
              title="Next"
              buttonStyle={styles.button}
              onPress={goToAbout}
            ></Button>
          </Row>
        </Grid>
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
    overflow: "hidden",
    backgroundColor: "#f9c2ff"
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
