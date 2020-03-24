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
import { List, ListItem } from "react-native-elements";
import { Actions } from "react-native-router-flux";

//API
import ReadingApi from "../API/ReadingAPI";
// import ViewsApi from "../API/ViewsAPI";

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
  const [catagory_id, setcatagory_id] = useState("");
  const [numOfView, setnumOfView] = useState(0);
  const views = e => {
    e.preventDefault();
    fetch(`http://10.0.2.2:3000/views`, {
      method: "POST",
      body: JSON.stringify({ catagory_id, numOfView })
        .then(() => setIsSent(true))
        .catch(() => alert("There was an error, please try again"))
    });
  };

  if (result) {
    console.log(result);
    console.log(result.length);

    //Navigator
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

          {/* Render CatagoryName */}
          <FlatGrid
            itemDimension={110}
            items={result}
            style={styles.gridView}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={e => {
                  setnumOfView(1);
                  setcatagory_id(item.catagory_id);
                }}
              >
                <Card containerStyle={styles.itemContainer}>
                  <View style={{ alignItems: "center" }}>
                    <Text style={styles.itemTopic}>{item.categoryName}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.catagory_id}
          />
          <Row style={styles.container}>
            <Button title="Next" buttonStyle={styles.button} onPress={views} />
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
