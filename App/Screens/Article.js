// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   ImageBackground,
//   FlatList
// } from "react-native";
// import { Card, Button } from "react-native-elements";
// import { Grid, Col, Row } from "react-native-easy-grid";
// import { FlatGrid } from "react-native-super-grid";
// import ReadingApi from "../API/ReadingAPI";
// import { List, ListItem } from "react-native-elements";

// const Article = () => {
//   return (
//     <ScrollView>
//       <Text>Meee</Text>
//     </ScrollView>
//   )

// };
// export default Article




// // export default Interest;

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: "center",
// //     justifyContent: "center"
// //   },
// //   gridView: {
// //     marginTop: 20,
// //     flex: 1
// //   },
// //   itemContainer: {
// //     borderRadius: 5,
// //     height: 110,
// //     width: 110,
// //     overflow: "hidden"
// //   },
// //   topic: {
// //     fontSize: 20,
// //     color: "#000",
// //     marginTop: 50,
// //     fontWeight: "bold"
// //   },
// //   descript: {
// //     fontSize: 16,
// //     color: "#000",
// //     fontWeight: "600"
// //   },
// //   itemTopic: {
// //     fontSize: 14,
// //     color: "#000",
// //     fontWeight: "bold"
// //   },
// //   button: {
// //     width: 200,
// //     marginTop: 20
// //   }
// // });


import React from 'react'
import { TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

const Article = () => {
   const goToAbout = () => {
      Actions.about()
   }
   return (
      <TouchableOpacity style = {{ margin: 128 }} onPress = {goToAbout}>
         <Text>This is HOME!</Text>
      </TouchableOpacity>
   )
}
export default Article