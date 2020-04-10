import React from "react";
import { TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { Card } from "@ant-design/react-native";

const TimelineCard = (props) => {
  const { title, img, imgHeight, width, titleHeight, height } = props;
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
          <Image
            source={img}
            style={{
              height: imgHeight,
              width: width,
              borderTopRightRadius: 3,
              borderTopLeftRadius: 3,
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
    marginHorizontal: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 10,
    paddingLeft: 5,
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
