import React, { Component } from "react";
import { StyleSheet, Text, AppRegistry } from "react-native";
import Interest from "./App/Screens/InterestScreen";
import Routes from "./Routes.js";

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
