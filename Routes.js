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
const TabIcon = ({ focused, title }) => {
  var color = focused ? "black" : "grey";

  // return <Text style={{ color: selected ? "red" : "yellow" }}>{title}</Text>;
  if (title == "Home") {
    return <Ionicons name="md-home" size={32} color={color}></Ionicons>;
  }
  if (title == "Trick") {
    return <Ionicons name="md-bulb" size={32} color={color}></Ionicons>;
  }
  if (title == "Mylist") {
    return <Ionicons name="md-bookmark" size={32} color={color}></Ionicons>;
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
