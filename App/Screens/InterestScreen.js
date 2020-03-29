import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  Button,
  Alert,
  Image,
  ScrollView
} from "react-native";
import { Card } from "@ant-design/react-native";
import GradientButton from "react-native-gradient-buttons";
// import LinearGradient from "expo-linear-gradient";
import Constants from "expo-constants";

import { Actions } from "react-native-router-flux";

//API
import ReadingApi from "../API/ReadingAPI";
import axios from "axios";

const DATA = [
  {
    img: require("./../assets/catagory/Animal.jpg")
  },
  {
    img: require("./../assets/catagory/Food.jpg")
  },
  {
    img: require("./../assets/catagory/News.jpg")
  },
  {
    img: require("./../assets/catagory/Animal.jpg")
  },
  {
    img: require("./../assets/catagory/Food.jpg")
  },
  {
    img: require("./../assets/catagory/News.jpg")
  },
  {
    img: require("./../assets/catagory/Animal.jpg")
  },
  {
    img: require("./../assets/catagory/Food.jpg")
  }
];

function Item({ category_id, title, selected, onSelect, img }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(category_id)}
      style={[
        styles.item,
        {
          borderColor: selected ? "#7EF192" : "transparent"
        }
      ]}
    >
      <Card style={styles.card}>
        <Card.Body style={styles.cardImg}>
          <Image
            source={img}
            style={{
              width: 90,
              height: 90,
              borderTopRightRadius: 3,
              borderTopLeftRadius: 3
            }}
          />
        </Card.Body>
        <Card.Body style={styles.cardTitle}>
          <Text style={styles.title}>{title}</Text>
        </Card.Body>
      </Card>
    </TouchableOpacity>
  );
}

const arrayId = [];
export default function App() {
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
  const [selected, setSelected] = React.useState(new Map());
  const [categoryId, setCategoryId] = useState(0);

  const onSelect = React.useCallback(
    category_id => {
      const newSelected = new Map(selected);
      newSelected.set(category_id, !selected.get(category_id));

      setSelected(newSelected);
    },
    [selected],
    console.log(selected)
  );

  if (result) {
    // console.log(result);
    // console.log(result.length);

    //Navigator
    const goToMaybeYouLike = () => {
      Actions.MaybeYouLike({ text: arrayId });
    };

    return (
      <SafeAreaView style={styles.container}>
        {/* <View style={{ backgroundColor: "orange", flex: 1 }} />
        <LinearGradient
          colors={["rgba(0,0,0,0.8)", "transparent"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 300
          }}
        /> */}
        <Text style={styles.header}>Interest</Text>
        <Text style={styles.subHeader}>Please select 3 that you interests</Text>
        <FlatList
          numColumns={3}
          data={result}
          renderItem={({ item }) => (
            <Item
              // topic={item.title}
              category_id={item.category_id}
              title={item.categoryName}
              // img={data.img}
              selected={!!selected.get(item.category_id)}
              onSelect={onSelect}
            />
          )}
          keyExtractor={item => item.category_id}
          extraData={selected}
        />
        <GradientButton
          style={{ marginTop: 0 }}
          text="Next"
          textStyle={{ fontSize: 20, color: "#000000" }}
          gradientDirection="vertical"
          gradientBegin="#7EF192"
          gradientEnd="#2DC897"
          height={39}
          width={245}
          radius={30}
          impact
          impactStyle="Light"
          onPressAction={goToMaybeYouLike()}
        />
      </SafeAreaView>
    );
  } else {
    return <Text>Loading</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems: "center"
  },
  item: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 5,
    marginHorizontal: 8,
    marginVertical: 10
  },
  title: {
    fontSize: 10,
    paddingLeft: 5
  },
  cardImg: {
    width: 110,
    height: 90,
    resizeMode: "contain",
    paddingTop: 0
  },
  cardTitle: {
    height: 20,
    width: 110
  },
  card: {
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    elevation: 4
  },
  header: {
    fontSize: 20
  },
  subHeader: {
    fontSize: 10
  }
});
