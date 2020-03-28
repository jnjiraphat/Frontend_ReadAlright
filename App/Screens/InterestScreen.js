import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  FlatList,
  Alert
} from "react-native";
import { Card, Button } from "react-native-elements";
import { Grid, Col, Row } from "react-native-easy-grid";
import { FlatGrid } from "react-native-super-grid";
import { List, ListItem } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import CatCard from "./../components/CategoryCard";

//API
import ReadingApi from "../API/ReadingAPI";

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
    const goToMaybeYouLike = () => {
      Actions.MaybeYouLike({ text: arrayId });
    };

    return (
      <ScrollView>
        <CatCard />
      </ScrollView>
    );
  } else {
    return <Text>Loading</Text>;
  }
};

export default Interest;

const styles = StyleSheet.create({});
