import React from "react";
import { TouchableOpacity, StyleSheet, Text, Image, View } from "react-native";
import { Card } from "@ant-design/react-native";

import ButtonNoClick from "../components/ButtonNoClick";

const ArticleCard = (props) => {
  const { title, image, imgHeight, width, level_reading } = props;
  return (
    <TouchableOpacity style={[styles.item]}>
      <View style={styles.rowItemImg}>
        <View style={{ position: "absolute", bottom: 0 }}>
          <ButtonNoClick
            colorsStart="#86B8F3"
            colorsEnd="#2DC897"
            padding={0}
            radius={5}
            height={26}
            width={51}
            fontSize={12}
            fontcolor="#000"
            text={level_reading}
          />
        </View>
        <Image
          source={{
            uri: image,
          }}
          style={{width:100,height:90}}
        />
      </View>
      <View style={styles.rowItemTitle}>
        <Text style={{ fontFamily: "PT-Reg", fontSize: 20 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  rowItemTitle: {
    borderColor: "transparent",
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
    width: 250,
    height: 90,
    paddingHorizontal: 10,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  rowItemImg: {
    borderColor: "transparent",
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    width: 100,
    height: 90,
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
