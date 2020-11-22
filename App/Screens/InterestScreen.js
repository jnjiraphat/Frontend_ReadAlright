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
  Dimensions,
} from "react-native";
import { Card } from "@ant-design/react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Actions } from "react-native-router-flux";
import ButtonClick from "./../components/ButtonClick";
import Constants from "expo-constants";
import CountView from "../API/CountViewsAPI";
import LoadingScreen from './LoadingScreen'

//API
import ReadingApi from "../API/ReadingAPI";
import axios from "axios";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Content"
        onPress={() => navigation.navigate("Content")}
      />
    </View>
  );
}

// const Stack = createStackNavigator();

const ImageCards = () => {
  return <Image />;
};

function Item({ category_id, title, selected, onSelect, img }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(category_id)}
      style={[
        styles.item,
        {
          borderColor: selected ? "#7EF192" : "transparent",
          borderWidth: selected ? 5 : 5,
        },
      ]}
    >
      <Card style={styles.card}>
        <Card.Body style={styles.cardImg}>
          <Image
            source={{
              uri: img,
            }}
            style={{
              width: 110,
              height: 90,
              borderTopRightRadius: 3,
              borderTopLeftRadius: 3,
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

const arrayIdCate = [];

const interest = (props) => {
  //Fetch(GET) Catagory Name
  const [result, setResult] = useState([]);
  const read = async () => {
    const data = await ReadingApi();
    setResult(data);
  };
  useEffect(() => {
    // console.log("uuid interest = ")
    // console.log(props.text)
    read();
  }, []);

  //Selected category
  const [selected, setSelected] = React.useState(new Map());
  const getKey = selected.keys();

  const onSelect = React.useCallback(
    (category_id) => {
      const newSelected = new Map(selected);
      newSelected.set(category_id, !selected.get(category_id));

      setSelected(newSelected);
    },
    [selected],
    console.log(selected)
  );

  if (result) {
    function logMapElements(value, key, map) {
      console.log(`m[${key}] = ${value}`);
    }

    selected.forEach(logMapElements);

    //Navigator
    const goToHome = () => {
      function logMapElements(value, key, map) {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(`m[${key}] = ${value}`);
        if (value == true) {
          arrayIdCate.push(key);
        }
        console.log("length = " + arrayIdCate.length);
      }
      selected.forEach(logMapElements);
      for (let index = 0; index < arrayIdCate.length; index++) {
        axios
          .post("http://ec2-3-90-114-38.compute-1.amazonaws.com:3000/views", {
            numOfView: 1,
            category_id: arrayIdCate[index],
            user_id: 1,
            reading_id: 1,
            vocabBox_id: 1,
            is_Active: "1",
          })
          .then(
            (response) => {
              console.log("upload success!!!");
            },
            (error) => {
              console.log(error);
            }
          );
      }

      Actions.Home({ text: arrayIdCate });
    };

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={["#FFB382", "#F07590"]}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: Dimensions.get("window").height,
            width: Dimensions.get("window").width,
          }}
        />
        <View style={styles.textLayout}>
          <Text style={styles.header}>Interest</Text>
          <Text style={styles.subHeader}>
            Choose categories that you interested.
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
              img={item.image}
              selected={!!selected.get(item.category_id)}
              onSelect={onSelect}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          extraData={selected}
        />
        <ButtonClick
          text="Next"
          fontSize={24}
          fontFamily="PT-Bold"
          fontcolor="#000000"
          height={39}
          width={245}
          radius={30}
          padding={0}
          marginBottom="10%"
          onPressAction={goToHome}
          // shadowRadius={30}
          colorsStart="#7EF192"
          colorsEnd="#2DC897"
          flex={1}
        />
      </View>
    );
  } else {
    return <View style={{ flex: 1 }}>
      <LoadingScreen />
    </View>;
  }
}
export default interest;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: "column",
    marginTop: Constants.statusBarHeight,
  },
  textLayout: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    alignContent: "center",
  },
  item: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
    borderRadius: 5,
    marginHorizontal: 8,
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
    paddingLeft: 5,
    fontFamily: "PT-Bold",
  },
  cardImg: {
    width: 110,
    height: 90,
    resizeMode: "contain",
    paddingTop: 0,
  },
  cardTitle: {
    height: 20,
    width: 110,
    alignContent: "center",
  },
  card: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
  },
  header: {
    fontSize: 24,
    fontFamily: "PT-Bold",
  },
  subHeader: {
    fontSize: 16,
    fontFamily: "PT-Reg",
  },
});
