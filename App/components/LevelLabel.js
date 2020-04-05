import React from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const LevelLabel = (props) => {
  const { level } = props;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <LinearGradient
        colors={["#86B8F3", "#2DC897"]}
        style={{
          alignItems: "center",
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
          alignItems: "center",
          justifyContent: "center",
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
    </View>
  );
};

export default LevelLabel;
