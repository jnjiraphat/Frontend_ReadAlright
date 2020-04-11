import React, { Component } from "react";
import { Router, Scene, Tabs } from "react-native-router-flux";
import Article from "./App/Screens/Article.js";
// import MaybeYouLike from "./App/Screens/MaybeYouLike";
import InterestScreen from "./App/Screens/InterestScreen.js";
import ContentScreen from "./App/Screens/ContentScreen";
import MyHome from "./App/Screens/Home.js";
// import { Router,Scene} from "react-native-router-flux";
// import Home from "../App/Screens/Home";
import Tricks from "./App/Screens/Tricks";
import Mylist from "./App/Screens/Mylist";
import { Text } from "react-native";
// import Article from "./App/Screens/Article"
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  ScrollView,
  ImageBackground,
  FlatList,
} from "react-native";

const TabIcon = ({ focused, title }) => {
  // var color = focused ? "black" : "grey";

  // return <Text style={{ color: selected ? "red" : "yellow" }}>{title}</Text>;
  if (title == "Home") {
    if (focused) {
      return (
        <MaterialCommunityIcons
          name="home-variant"
          size={28}
        ></MaterialCommunityIcons>
      );
    } else {
      return (
        <MaterialCommunityIcons
          name="home-outline"
          size={28}
        ></MaterialCommunityIcons>
      );
    }
  }
  if (title == "Trick") {
    if (focused) {
      return (
        <MaterialCommunityIcons
          name="lightbulb-on"
          size={28}
        ></MaterialCommunityIcons>
      );
    } else {
      return (
        <MaterialCommunityIcons
          name="lightbulb-on-outline"
          size={28}
        ></MaterialCommunityIcons>
      );
    }
  }
  if (title == "Mylist") {
    if (focused) {
      return <FontAwesome name="bookmark" size={28} ></FontAwesome>;
    } else {
      return <FontAwesome name="bookmark-o" size={28}></FontAwesome>;
    }
  }
  // return <Text>{selected}</Text>
};

const Routes = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar showLabel={false}>
        <Scene
          key="Interest"
          component={InterestScreen}
          title="Interest"
          hideNavBar
          hideTabBar
          initial
          showLabel={false}
        />
        <Scene
          key="tabbar"
          tabs
          tabBarStyle={{ backgroundColor: "white" ,height : 61}}
          wrap={false}
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
      </Scene>
    </Router>
  );
};
export default Routes;

const styles = StyleSheet.create({
 
});
