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

const TabIcon = ({ focused, title }) => {
  // var color = focused ? "black" : "grey";

  // return <Text style={{ color: selected ? "red" : "yellow" }}>{title}</Text>;
  if (title == "Home") {
    if (focused) {
      return (
        <MaterialCommunityIcons
          name="home-variant"
          size={32}
        ></MaterialCommunityIcons>
      );
    } else {
      return (
        <MaterialCommunityIcons
          name="home-outline"
          size={32}
        ></MaterialCommunityIcons>
      );
    }
  }
  if (title == "Trick") {
    if (focused) {
      return (
        <MaterialCommunityIcons
          name="lightbulb-on"
          size={32}
        ></MaterialCommunityIcons>
      );
    } else {
      return (
        <MaterialCommunityIcons
          name="lightbulb-on-outline"
          size={32}
        ></MaterialCommunityIcons>
      );
    }
  }
  if (title == "Mylist") {
    if (focused) {
      return <FontAwesome name="bookmark" size={32}></FontAwesome>;
    } else {
      return <FontAwesome name="bookmark-o" size={32}></FontAwesome>;
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
          tabBarStyle={{ backgroundColor: "#FFFFFF" }}
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

// <Scene key="root">
// {/* <Scene
//   key="Home"
//   component={Home}
//   title="Home"
//   initial={true}
//   hideNavBar={true}
// /> */}
// <Scene
//   key="Interest"
//   component={InterestScreen}
//   title="Interest"
//   // initial={true}
//   hideNavBar={true}
// />

// <Scene key="Article" component={Article} title="Article" />
// <Scene key="Mylist" component={Mylist} title="Mylist" />

// <Scene
// key= "tabbar"
// tabs
// tabBarStyle={{ backgroundColor: "#FFFFFF" }}>
//   <Scene key="osu" title="OSU" icon={TabIcon}>
//     <Scene
//     key="Home"
//     component={Home}
//     title="Home"
//     />
//     <Scene
//     key="Tricks"
//     component={Tricks}
//     title="Tricks"
//     />
//     <Scene
//     key="ContentScreen"
//     component={ContentScreen}
//     title="ContentScreen"
//     />
//   </Scene>
// </Scene>
// </Scene>
