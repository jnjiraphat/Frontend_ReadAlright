import React, { useState } from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const AreaProfile = (props) => {
  const [name, showName] = useState("Thanatcha");
  const { level, display } = props;
  const [sugggestion, hideSuggestion] = useState(
    "You should practice adverb more"
  );
  return (
    <View style={{ flexDirection: "column" }}>
      <View style={{ flexDirection: "row" }}>
        <LinearGradient
          colors={["#86B8F3", "#2DC897"]}
          style={{
            marginRight: 15,
            // position: "absolute",
            // left: 167,
            borderRadius: 5,
            height: 26,
            width: 51,
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowRadius: 4.65,
            shadowColor: "#000000",
            shadowOpacity: 0.3,
            elevation: 8,
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "bold",
              color: "#000000",
            }}
          >
            {level}
          </Text>
        </LinearGradient>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#000000",
          }}
        >
          {name}
        </Text>
      </View>
      <View style={{ display: display }}>
        <Text>{sugggestion} </Text>
        <Text>{sugggestion} </Text>
        <Text>{sugggestion} </Text>
      </View>
    </View>
  );
};

export default AreaProfile;
