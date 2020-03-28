
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ReadingApi from "../API/ReadingAPI";
import { Card, Button } from "react-native-elements";
import { Grid, Col, Row } from "react-native-easy-grid";
import { FlatGrid } from "react-native-super-grid";
import {
   StyleSheet,
   View,
   ScrollView,
   ImageBackground,
   FlatList
} from "react-native";

const Article = (props) => {
   console.log("This is id")
   console.log(props.text)


   // const goToAbout = () => {
   //    Actions.about()
   // }
   return (
      // <TouchableOpacity style = {{ margin: 128 }} onPress = {goToAbout}>
      //    <Text>This is HOME!</Text>
      // </TouchableOpacity>
      <Text>This is HOME</Text>
   )
}
export default Article