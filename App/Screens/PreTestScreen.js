import React from "react";
import {
  View,
  ScrollView,
  FlatList,
  Dimensions,
  Text,
  StyleSheet,
  SectionList,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import HeaderText from "../components/HeaderText";
import ButtonClick from "../components/ButtonClick";
// import whiteCardStyle from "../components/WhiteCardStyle";
// import { useFonts } from "@use-expo/font";
import TestBox from "../components/TestBox";

const PreTest = () => {
  const sections = [
    {
      question: "Question1",
      key: "1",
      data: [
        {
          key: "1",
          list: [
            {
              choice: "Carrot",
              color: "Orange",
            },
            {
              choice: "Cabbage",
              color: "Purple",
            },
            {
              choice: "Strawberry",
              color: "Red",
            },
            {
              choice: "Blueberry",
              color: "Blue",
            },
          ],
        },
      ],
    },
    {
      question: "Question2",
      key: "2",
      data: [
        {
          key: "2",
          list: [
            {
              choice: "Apple",
              color: "Green",
            },
            {
              choice: "Banana",
              color: "Yellow",
            },
            {
              choice: "Strawberry",
              color: "Red",
            },
            {
              choice: "Blueberry",
              color: "Blue",
            },
          ],
        },
      ],
    },
  ];

  // let [fontsLoaded] = useFonts({
  //   // "PTSansCaption-Regular": require("../assets/font/PTSansCaption-Regular.ttf"),
  //   "PTSansCaption-Bold": require("../assets/font/PTSansCaption-Bold.ttf"),
  // });
  // if (!fontsLoaded) {
  //   return console.log("Font not load");
  // } else {

  const renderSectionListItem = ({ item }) => {
    return (
      <FlatList
        data={item}
        numColumns={2}
        contentContainerStyle={{ flexDirection: "row" }}
        renderItem={({ item }) => (
          <ButtonClick
            // onPressAction={}
            colorsStart="#E9B0FF"
            colorsEnd="#8A63E5"
            // padding=
            radius={10}
            height={39}
            width={112}
            fontSize={14}
            fontWeight="normal"
            fontcolor="#000"
            text={item}
            marginBottom={10}
            marginTop={10}
          />
        )}
      />
    );
  };

  return (
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
    >
      <ScrollView style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.textLayout}>
            <HeaderText text="Pre-Test" />
            <Text style={styles.subHeader}>
              Fill the gaps with the correct word from the box.
            </Text>
          </View>
          <TestBox sections={sections} />
          <ButtonClick
            text="Submit"
            fontSize={24}
            fontWeight="Bold"
            fontcolor="#000000"
            height={39}
            width={245}
            radius={30}
            padding={0}
            marginBottom="10%"
            // onPressAction={goToHome}
            // shadowRadius={30}
            colorsStart="#7EF192"
            colorsEnd="#2DC897"
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
  // }
};
export default PreTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  // header: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  // },
  subHeader: {
    marginTop: "5%",
    fontSize: 16,
    // fontFamily: "PTSansCaption-Bold",
  },
  textLayout: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10%",
    width: Dimensions.get("window").width / 1.25,
  },
  whiteCard: {
    // flex: 1,
    width: Dimensions.get("window").width / 1.15,
    // justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#ffffff",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
    marginVertical: 20,
    paddingVertical: 20,
  },
  LayoutChoice: {
    flex: 1,
    flexDirection: "row",
    width: Dimensions.get("window").width / 1.35,
  },
});
