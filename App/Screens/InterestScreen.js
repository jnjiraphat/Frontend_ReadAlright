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

//API
import ReadingApi from "../API/ReadingAPI";
import axios from "axios";

<<<<<<< HEAD

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Content"
        onPress={() => navigation.navigate('Content')}
      />
    </View>
  );
}


// const Stack = createStackNavigator();


const ImageCards = () => {
  return <Image />;
};
=======
const DATA = [
  {
    img: require("./../assets/catagory/Animal.jpg"),
  },
  {
    img: require("./../assets/catagory/Food.jpg"),
  },
  {
    img: require("./../assets/catagory/News.jpg"),
  },
  {
    img: require("./../assets/catagory/Animal.jpg"),
  },
  {
    img: require("./../assets/catagory/Food.jpg"),
  },
  {
    img: require("./../assets/catagory/News.jpg"),
  },
  {
    img: require("./../assets/catagory/Animal.jpg"),
  },
  {
    img: require("./../assets/catagory/Food.jpg"),
  },
];
>>>>>>> 4d7b749c669b6f700156e128dfbe07227130803b

function Item({ category_id, title, selected, onSelect, img }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(category_id)}
      style={[
        styles.item,
        {
          borderColor: selected ? "#7EF192" : "transparent",
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
              width: 90,
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

const arrayId = [];
const arrayIdCate = [];

export default function () {
  //Fetch(GET) Catagory Name
  const [result, setResult] = useState([]);
  const read = async () => {
    const data = await ReadingApi();
    setResult(data);
  };
  useEffect(() => {
    read();
  }, []);
<<<<<<< HEAD
dsfsdfdsf
  const [view, setview] = useState(0);
=======

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
>>>>>>> 4d7b749c669b6f700156e128dfbe07227130803b

  if (result) {
    function logMapElements(value, key, map) {
      console.log(`m[${key}] = ${value}`);
    }

<<<<<<< HEAD
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
          <Row>
            <View style={{ flex: 1, paddingTop: 20 }}>
              <FlatList
                onPress={() => setview(view + 1)}
                data={result}
                renderItem={({ item }) => (
                  <ListItem
                    roundAvatar
                    title={item.categoryName}
                    subtitle={item.typeName}

                  />
                )}
                keyExtractor={({ id }, index) => id}
              />

            </View>
          </Row>
          {/* <Row>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Details" component={DetailsScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </Row> */}
=======
    selected.forEach(logMapElements);
>>>>>>> 4d7b749c669b6f700156e128dfbe07227130803b

    //Navigator
    const goToHome = () => {
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
      <SafeAreaView style={styles.container}>
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
            Choose 3 categories that you interested.
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
          keyExtractor={(item) => item.category_id}
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
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 10,
    paddingLeft: 5,
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
