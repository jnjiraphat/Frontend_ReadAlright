import React, { Component } from "react";
import { StyleSheet, Text, AppRegistry } from "react-native";
import Interest from "./App/Screens/InterestScreen";
import Routes from "./Routes.js";
import * as firebase from "firebase";


var firebaseConfig = {
  apiKey: "AIzaSyA6-ykf9ZduUIbdsgdsgAuE08pH3SFAo6M",
  authDomain: "readalright.firebaseapp.com",
  databaseURL: "https://readalright.firebaseio.com",
  projectId: "readalright",
  storageBucket: "readalright.appspot.com",
  messagingSenderId: "730744212125",
  appId: "1:730744212125:web:38634bee0504ef94f62274",
  measurementId: "G-0XP8KDX5KW",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return <Routes />;
  }
}
export default App;
AppRegistry.registerComponent("App", () => App);
// export default function App() {
//   return <Interest />;
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// });
