import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  Alert,
  Image,
  ScrollView,
  View,
  Dimensions
} from "react-native";
import { Card } from "@ant-design/react-native";
import Constants from "expo-constants";
import { LinearGradient } from "expo-linear-gradient";
import { Actions } from "react-native-router-flux";
import ButtonClick from "./../components/ButtonClick";

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
const arrayIdCate = [];

export default function() {
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
  // const cateId = () => {
  //   arrayId.push(categoryId);
  //   console.log("push success!!!" + categoryId);
  // };
  // const views = e => {
  //   axios
  //     .post("http://10.0.2.2:3000/views", {
  //       numOfView: 1,
  //       category_id: categoryId,
  //       user_id: 1,
  //       reading_id: 1,
  //       vocabBox_id: 1
  //     })
  //     .then(
  //       response => {
  //         arrayId.push(categoryId);

  //         console.log("array length = " + arrayId.length);
  //         for (let index = 0; index < arrayId.length; index++) {
  //           const element = arrayId[index];
  //           console.log("index = " + [index] + "value = " + element);
  //         }
  //         // console.log("eiei");
  //         // console.log(response.data);
  //       },
  //       error => {
  //         console.log(error);
  //       }
  //     );
  // };
  // console.log(categoryId);

  //Selected category
  const [selected, setSelected] = React.useState(new Map());
  const getKey = selected.keys();

  const onSelect = React.useCallback(
    category_id => {
      const newSelected = new Map(selected);
      newSelected.set(category_id, !selected.get(category_id));

      setSelected(newSelected);
      // if (newSelected.get(category_id) == true) {
      //   arrayId.push(newSelected.get(category_id));
      // } else if (newSelected.get(category_id) == false) {
      //   arrayId.pop();
      // } else {
      //   console.log("error");
      // }
    },
    [selected],
    console.log(selected)
    // console.log(arrayId)
  );

  if (result) {
    function logMapElements(value, key, map) {
      console.log(`m[${key}] = ${value}`);
    }
    // var mapIter = props.text.keys();
    // console.log(mapIter.next().value);
    // console.log(mapIter.next().value);
    // console.log(props.text.size)

    selected.forEach(logMapElements);
    // console.log(result);
    // console.log(result.length);

    //Navigator
    const goToMaybeYouLike = () => {
      function logMapElements(value, key, map) {
        console.log(`m[${key}] = ${value}`);
        if (value == true) {
          arrayIdCate.push(key);
        }
        console.log("length = " + arrayIdCate.length);
      }
      selected.forEach(logMapElements);
      for (let index = 0; index < arrayIdCate.length; index++) {
        axios
          .post("http://10.0.2.2:3000/views", {
            numOfView: 1,
            category_id: arrayIdCate[index],
            user_id: 1,
            reading_id: 1,
            vocabBox_id: 1
          })
          .then(
            response => {
              console.log("upload success!!!");
            },
            error => {
              console.log(error);
            }
          );
      }

      Actions.MaybeYouLike({ text: arrayIdCate });
    };

    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={["#FFB382", "#F07590"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width
          }}
        />
        <View style={styles.textLayout}>
          <Text style={styles.header}>Interest</Text>
          <Text style={styles.subHeader}>
            Please select the categories that you interested
          </Text>
        </View>
        <FlatList
          numColumns={3}
          data={result}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          renderItem={({ item }) => (
            <Item
              // topic={item.title}
              category_id={item.category_id}
              title={item.categoryName}
              // img={data.img}'

              selected={!!selected.get(item.category_id)}
              onSelect={onSelect}
            />
          )}
          keyExtractor={item => item.category_id}
          extraData={selected}
        />
        <ButtonClick
          text="next"
          fontSize={24}
          fontWeight="normal"
          fontcolor="#000000"
          height={39}
          width={245}
          radius={30}
          padding={0}
          onPressAction={goToMaybeYouLike}
          // shadowRadius={30}
          colorsStart="#7EF192"
          colorsEnd="#2DC897"
        />
        {/* <GradientButton
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
          onPressAction={goToMaybeYouLike}
        /> */}
      </SafeAreaView>
    );
  } else {
    return <Text>Loading</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "column",
    marginTop: Constants.statusBarHeight
  },
  textLayout: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  item: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 5,
    marginHorizontal: 10,
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
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8
  },
  header: {
    fontSize: 24,
    fontWeight: "bold"
  },
  subHeader: {
    fontSize: 16
  }
});
