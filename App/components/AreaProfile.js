import React, { useState, useEffect } from "react";

import { Text, View, StyleSheet, FlatList } from "react-native";
import ButtonNoClick from "../components/ButtonNoClick";

const AreaProfile = (props) => {
  const [name, showName] = useState("Thanatcha");
  const { display, level, suggestion } = props;
  console.log("In Area");
  console.log(suggestion);
  console.log("In Area");

  return suggestion != null ? (
    <View style={{ flexDirection: "column" }}>
      <View style={{ flexDirection: "row" }}>
        <ButtonNoClick
          colorsStart="#86B8F3"
          colorsEnd="#2DC897"
          padding={0}
          radius={5}
          height={26}
          width={51}
          fontSize={12}
          fontcolor="#000"
          text={level}
        />
        <Text
          style={{
            fontSize: 16,
            color: "#000000",
            marginLeft: "3%",
            fontFamily: "PT-Bold",
          }}
        >
          {name}
        </Text>
      </View>
      <View style={{ display: display, marginTop: "3%" }}>
        <FlatList
          data={suggestion}
          renderItem={({ item }) => {
            return <Text style={styles.textSug}>{item.suggestion}</Text>;
          }}
          keyExtractor = { (item, index) => index.toString() }
        />
      </View>
    </View>
  ) : (
    <View style={{ flexDirection: "column" }}>
      <View style={{ flexDirection: "row" }}>
        <ButtonNoClick
          colorsStart="#86B8F3"
          colorsEnd="#2DC897"
          padding={0}
          radius={5}
          height={26}
          width={51}
          fontSize={12}
          fontcolor="#000"
          text={level}
        />
        <Text
          style={{
            fontSize: 16,
            color: "#000000",
            marginLeft: "3%",
            fontFamily: "PT-Bold",
          }}
        >
          {name}
        </Text>
      </View>
    </View>
  );
};

export default AreaProfile;

const styles = StyleSheet.create({
  textSug: {
    fontFamily: "PT-Reg",
    fontSize: 12,
  },
});
