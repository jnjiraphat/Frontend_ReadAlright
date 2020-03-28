import { ListItem } from 'react-native-elements'
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
import axios from 'axios'

const Article = (props) => {
   const [cate, setCate] = useState([]);

   const fetch = async () => {
      console.log("runningggggggggggggggggggggggggggggg")
      await axios
         .get("http://10.0.2.2:3000/reading/categorys/" + props.text)
         .then(
            response => {
               console.log("eiei");
               console.log(response.data.reading);
               setCate(response.data.reading)
            },
            error => {
               console.log(error);
            }
         );

   };

   const read = async () => {
      const data = await fetch();

   };
   useEffect(() => {
      read();
   }, []);
   console.log("This is id")
   console.log(props.text)


   // const goToAbout = () => {
   //    Actions.about()
   // }
   return (
      <ScrollView>
      <Grid>
      <FlatGrid
      items={cate}
      renderItem={({ item }) => (
         <ListItem
         key={item.category_id}
         title={item.title}
         leftIcon={{ name: item.icon }}
         bottomDivider
         chevron
       />

      )}
   />
</Grid>
</ScrollView>

   )
}
export default Article

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
   },
   gridView: {
      marginTop: 20,
      flex: 1
   },
   itemContainer: {
      borderRadius: 5,
      height: 110,
      width: 110,
      overflow: "hidden"
   },
   topic: {
      fontSize: 20,
      color: "#000",
      marginTop: 50,
      fontWeight: "bold"
   },
   descript: {
      fontSize: 16,
      color: "#000",
      fontWeight: "600"
   },
   itemTopic: {
      fontSize: 14,
      color: "#000",
      fontWeight: "bold"
   },
   button: {
      width: 200,
      marginTop: 20,
      marginBottom: 20
   }
});
