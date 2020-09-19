import React, { Component } from "react";
import { Router, Scene, Tabs } from "react-native-router-flux";
import Article from "./App/Screens/Article.js";
import ArticleVocab from "./App/Screens/ArticleVocab.js";

// import MaybeYouLike from "./App/Screens/MaybeYouLike";
import InterestScreen from "./App/Screens/InterestScreen.js";
import ContentScreen from "./App/Screens/ContentScreen";
import MyHome from "./App/Screens/Home.js";
import Login from "./App/Screens/Login"
import Vocabulary from './App/Screens/Vocabulary'
import ContentVocab from './App/Screens/ContentVocab'
import Tricks from "./App/Screens/Tricks";
import Mylist from "./App/Screens/Mylist";
import uploadImage from "./App/Screens/uploadImage";
import TestQuiz from "./App/Screens/TestQuiz";
import WordCollection from './App/Screens/WordCollection'

// import Article from "./App/Screens/Article"
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Dimensions, View, TouchableOpacity, Image, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "@use-expo/font";
import TestQuizChallenge from "./App/Screens/TestQuizChallenge.js";

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
  if (title == "WordCollection") {
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
    "Noto-Reg": require("./App/assets/fonts/NotoSansThai-Regular.ttf"),
  });

  if (fontsLoaded) {
    return (
      <Router>
        <Scene key="root" showLabel={false} navTransparent={true}>

          <Scene
            key="TestQuiz"
            component={TestQuiz}
            title="TestQuiz"
            hideNavBar
            hideTabBar
            showLabel={false}
          />
          {/* <Scene
            key="Login"
            component={Login}
            title="Login"
            hideNavBar
            hideTabBar
            showLabel={false}
          /> */}
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
            hideNavBar={true}
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
              key="WordCollection"
              title="WordCollection"
              icon={TabIcon}
              component={WordCollection}
              hideNavBar={true}
              showLabel={false}
            />
            {/* <Scene
              key="Mylist"
              title="Mylist"
              icon={TabIcon}
              component={Mylist}
              hideNavBar={true}
              showLabel={false}
            /> */}
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
            titleStyle={styles.title}
            back={true}
            showLabel={false}
          />

          <Scene
            key="Vocabulary"
            title="Vocabulary"
            component={Vocabulary}
            hideNavBar={true}
            showLabel={false}
          />
          <Scene
            key="ContentVocab"
            component={ContentVocab}
            title="ContentVocab"
            titleStyle={styles.title}
            back={true}
            showLabel={false}
          />

          <Scene
            key="TestQuizChallenge"
            component={TestQuizChallenge}
            title="TestQuizChallenge"
            titleStyle={styles.title}
            // hideNavBar
            hideTabBar
            showLabel={false}
          />
          <Scene
            key="ArticleVocab"
            component={ArticleVocab}
            title="ArticleVocab"
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
  backLine: {
    width: 20
  },
  title: {
    display: "none"
  }
});
