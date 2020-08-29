import React, { Component } from "react";
import { Text } from "react-native";
import { Router, Scene, Tabs } from "react-native-router-flux";
import Article from "./App/Screens/Article.js";
// import MaybeYouLike from "./App/Screens/MaybeYouLike";
import InterestScreen from "./App/Screens/InterestScreen.js";
import ContentScreen from "./App/Screens/ContentScreen";
import MyHome from "./App/Screens/Home.js";
import Login from "./App/Screens/Login"
// import Home from "../App/Screens/Home";
import Tricks from "./App/Screens/Tricks";
import Mylist from "./App/Screens/Mylist";
import PreTest from "./App/Screens/PreTestScreen";
import uploadImage from "./App/Screens/uploadImage";
import TestQuiz from "./App/Screens/TestQuiz";

// import Article from "./App/Screens/Article"
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Dimensions, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "@use-expo/font";

const TabIcon = ({ focused, title }) => {
  // var color = focused ? "black" : "grey";

  // return <Text style={{ color: selected ? "red" : "yellow" }}>{title}</Text>;
  if (title == "Home") {
    if (focused) {
      return (
        <LinearGradient colors={["#7EF192", "#2DC897"]} style={styles.gradient}>
          <MaterialCommunityIcons name="home-variant" size={28} />
        </LinearGradient>
      );
    } else {
      return (
        <LinearGradient colors={["#7EF192", "#2DC897"]} style={styles.gradient}>
          <MaterialCommunityIcons name="home-outline" size={28} />
        </LinearGradient>
      );
    }
  }
  if (title == "Trick") {
    if (focused) {
      return (
        <LinearGradient colors={["#7EF192", "#2DC897"]} style={styles.gradient}>
          <MaterialCommunityIcons name="lightbulb-on" size={28} />
        </LinearGradient>
      );
    } else {
      return (
        <LinearGradient colors={["#7EF192", "#2DC897"]} style={styles.gradient}>
          <MaterialCommunityIcons
            name="lightbulb-on-outline"
            size={28}
          ></MaterialCommunityIcons>
        </LinearGradient>
      );
    }
  }
  if (title == "Mylist") {
    if (focused) {
      return (
        <LinearGradient colors={["#7EF192", "#2DC897"]} style={styles.gradient}>
          <FontAwesome name="bookmark" size={28}></FontAwesome>
        </LinearGradient>
      );
    } else {
      return (
        <LinearGradient colors={["#7EF192", "#2DC897"]} style={styles.gradient}>
          <FontAwesome name="bookmark-o" size={28}></FontAwesome>
        </LinearGradient>
      );
    }
  }
  // return <Text>{selected}</Text>
};

const Routes = () => {
  //font
  let [fontsLoaded] = useFonts({
    "PT-Reg": require("./App/assets/fonts/PTSansCaption-Regular.ttf"),
    "PT-Bold": require("./App/assets/fonts/PTSansCaption-Bold.ttf"),
  });

  if (fontsLoaded) {
    return (
      <Router>
        <Scene key="root" hideNavBar showLabel={false}>
          <Scene
            key="MyHome"
            component={MyHome}
            title="MyHome"
            hideNavBar
            hideTabBar
            showLabel={false}
          />
          <Scene
            key="Login"
            component={Login}
            title="Login"
            hideNavBar
            hideTabBar
            showLabel={false}
          />
          <Scene
            key="PreTest"
            component={PreTest}
            title="PreTest"
            hideNavBar
            hideTabBar
            showLabel={false}
          />
          <Scene
            key="Interest"
            component={InterestScreen}
            title="Interest"
            hideNavBar
            hideTabBar
            showLabel={false}
          />
          <Scene
            key="tabbar"
            tabs
            tabBarStyle={{ height: 61 }}
            wrap={false}
            // initial
            showLabel={false}
          >
            <Scene
              key="Home"
              title="Home"
              icon={TabIcon}
              component={MyHome}
              hideNavBar={true}
              showLabel={false}
            />
            <Scene
              key="Trick"
              title="Trick"
              icon={TabIcon}
              component={Tricks}
              hideNavBar={true}
              showLabel={false}
            />
            <Scene
              key="Mylist"
              title="Mylist"
              icon={TabIcon}
              component={Mylist}
              hideNavBar={true}
              showLabel={false}
            />
          </Scene>
          <Scene
            key="Article"
            component={Article}
            title="Article"
            hideNavBar
            hideTabBar
            showLabel={false}
          />
          <Scene
            key="ContentScreen"
            component={ContentScreen}
            title="ContentScreen"
            // hideNavBar
            hideTabBar
            showLabel={false}
          />

          <Scene
            key="TestQuiz"
            component={TestQuiz}
            title="TestQuiz"
            // hideNavBar
            hideTabBar
            showLabel={false}
          />
        </Scene>
      </Router>
    );
  } else {
    return <Text>Loading</Text>;
  }
};
export default Routes;

const styles = StyleSheet.create({
  gradient: {
    width: Dimensions.get("window").width / 3,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
