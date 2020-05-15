import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import ButtonNoClick from "../components/ButtonNoClick";

const AreaProfile = (props) => {
  const [name, showName] = useState("Thanatcha");
  const { display, level } = props;
  const [sugggestion, hideSuggestion] = useState(
    "You should practice adverb more"
  );
  return (
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
        <Text style={styles.textSug}>{sugggestion} </Text>
        <Text style={styles.textSug}>{sugggestion} </Text>
        <Text style={styles.textSug}>{sugggestion} </Text>
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
