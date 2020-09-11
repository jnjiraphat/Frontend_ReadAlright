import React from "react";
import { TouchableOpacity, StyleSheet, Text, Image, View } from "react-native";
import { Card } from "@ant-design/react-native";

import ButtonNoClick from "../components/ButtonNoClick";

const ArticleCard = (props) => {
  const { title, image, imgHeight, width, titleHeight, isLevel,level_reading } = props;
  return (
    <TouchableOpacity style={[styles.item]}>
        <View style={styles.rowItemImg}>
            <Image source={{
              uri:image
              
            }}/>
        </View>
        <View style={styles.rowItemTitle}>
            <Text style={{fontFamily: "PT-Reg", fontSize: 20}}>{title}</Text>
        </View>
    </TouchableOpacity>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  rowItemTitle : {
    borderColor: "transparent",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    width: 250, 
    height: 90, 
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "#fff"
  },  
  rowItemImg : {
    borderColor: "transparent",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    width: 100, 
    height: 90, 
    backgroundColor: "blue"
  },  
  item: {
    borderColor: "transparent",
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 10,
    width: 350,
    height: 90,
    flexDirection: "row",
    shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowRadius: 4.65,
      shadowColor: "#000000",
      shadowOpacity: 0.3,
      elevation: 8,
  },
  title: {
    fontSize: 10,
    paddingLeft: 5,
    fontFamily: "PT-Bold",
  },
  card: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
  },
});
