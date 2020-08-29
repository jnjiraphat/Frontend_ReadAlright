import React from "react";
import { TouchableOpacity, StyleSheet, Text, Image, View, ViewPropTypes } from "react-native";
import { Card } from "@ant-design/react-native";

import ButtonNoClick from "../components/ButtonNoClick";

const TimelineCard = (props) => {
  const { title, img, imgHeight, width, titleHeight, isLevel,level_reading } = props;
  return (
    <TouchableOpacity style={[styles.item]}>
      <Card style={styles.card}>
        <Card.Body
          style={{
            height: imgHeight,
            width: width,
            resizeMode: "contain",
            paddingTop: 0,
            
          }}
        >
          {isLevel && 
          <View style={{position: 'absolute',bottom:0}}>
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
          }
          <Image
            source={{ uri: img }}
            style={{
              height: imgHeight,
              width: width,
              borderTopRightRadius: 3,
              borderTopLeftRadius: 3,
              position: "absolute"
            }}
          />
        </Card.Body>
        <Card.Body
          style={{
            height: titleHeight,
            width: width,
          }}
        >
          <Text style={styles.title}>{title}</Text>
        </Card.Body>
      </Card>
    </TouchableOpacity>
  );
};

export default TimelineCard;

const styles = StyleSheet.create({
  item: {
    borderColor: "transparent",
    borderRadius: 5,
    marginHorizontal: 5,
    marginVertical: 10,
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
