import React, { useState } from "react";
import { Text, View } from "react-native";
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
          fontWeight="bold"
          fontcolor="#000"
          text={level}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#000000",
            marginLeft: "3%",
          }}
        >
          {name}
        </Text>
      </View>
      <View style={{ display: display, marginTop: "3%" }}>
        <Text>{sugggestion} </Text>
        <Text>{sugggestion} </Text>
        <Text>{sugggestion} </Text>
      </View>
    </View>
  );
};

export default AreaProfile;
