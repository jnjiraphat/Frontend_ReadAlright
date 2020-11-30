import React, { Component, useCallback } from "react";
import { useState, useEffect } from "react";
import ModalSubmit from "../components/ModalSubmit";
import { Actions } from "react-native-router-flux";

import {
  Text,
  TouchableOpacity,
  View,
  SectionList,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ButtonClick from "../components/ButtonClick";
import ChoiceAPI from "../API/ChoiceAPI";
import axios from "axios";

const userAnswer = [];
const TestBox = (props) => {
  const { section } = props;
  const [check, setCheck] = useState([false]);
  const [myScore, setMyScore] = useState(0);
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const Checking = () => {
    try {
      var count = 0;

      selected.forEach(logMapElements);

      function logMapElements(value, key, map) {
        console.log(`m[${key}] = ${value}`);
        if (value == true) {
          userAnswer.push(key);
        }
        console.log("length = " + userAnswer.length);
      }
      for (let index = 0; index < userAnswer.length; index++) {
        console.log(userAnswer[index]);
        if (userAnswer[index] == "27") {
          console.log("true");
          count += 1;
        } else if (userAnswer[index] == "30") {
          console.log("true");
          count += 1;
        } else if (userAnswer[index] == "33") {
          console.log("true");

          count += 1;
        } else if (userAnswer[index] == "38") {
          console.log("true");

          count += 1;
        } else if (userAnswer[index] == "42") {
          console.log("true");

          count += 1;
        } else if (userAnswer[index] == "45") {
          console.log("true");

          count += 1;
        } else if (userAnswer[index] == "52") {
          console.log("true");

          count += 1;
        } else if (userAnswer[index] == "54") {
          console.log("true");

          count += 1;
        } else if (userAnswer[index] == "57") {
          console.log("true");

          count += 1;
        } else if (userAnswer[index] == "64") {
          console.log("true");

          count += 1;
        }
      }
    } catch (e) {
    } finally {
      setMyScore(count);
      setModalVisible(true);
    }

    
  };
  
  function Item({
    choice_id,
    choice,
    selected,
    onSelect,
    isRightChoice,
    question_id,
    count = 0,
    disabled
  }) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => onSelect(choice_id, isRightChoice, question_id, count)}
          style={{
            alignItems: "center",
            borderRadius: 10,
            borderStyle: "solid",
             borderWidth: 5,
            borderColor: "transparent",
            borderColor: selected ? "#FFD387" : "transparent",
            height: 39,
            width: 112,
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
          <LinearGradient
            colors={["#E9B0FF", "#8A63E5"]}
            style={{
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              height: 39,
              width: 112,
            }}
          >
            <Text
              style={[
                {
                  fontSize: 14,
                  color: "#000000",
                  fontFamily: "PT-Reg",
                },
                { color: selected ? "#ffffff" : "#000000" },
              ]}
            >
              {choice}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  const [score, setScore] = React.useState(new Map());
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    (choice_id) => {
      const newSelected = new Map(selected);
      newSelected.set(choice_id, !selected.get(choice_id));

      setSelected(newSelected);
    },
    [selected],
    console.log(selected)
  );
  
  const renderSection = ({ item }) => {
    return (
      <View style={styles.whiteCardChoice}>
        <View style={{ width: Dimensions.get("window").width / 1.35 }}>
          <FlatList
            data={item.choice}
            numColumns={2}
            renderItem={({ item }) => (
              <Item
                choice={item.choice}
                choice_id={item.choice_id}
                question_id={item.question_id}
                isRightChoice={item.isRightChoice}
                onSelect={onSelect}
                selected={!!selected.get(item.choice_id)}
                
              />
            )}
            keyExtractor = { (item, index) => index.toString() }
            extraData={selected}
          />
        </View>
      </View>
    );
  };

  const renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.whiteCardQuestion}>
        <View
          style={{
            width: Dimensions.get("window").width / 1.35,
            marginLeft: "10%",
          }}
        >
          <FlatList
            data={section.quiz}
            renderItem={({ item }) => (
              <Text style={styles.textQuestion}>{item.question}</Text>
            )}
            keyExtractor = { (item, index) => index.toString() }
          />
        </View>
      </View>
    );
  };

  const renderListItem = ({ item }) => {
    return (
      <ButtonClick
        colorsStart="#E9B0FF"
        colorsEnd="#8A63E5"
        radius={10}
        height={39}
        width={112}
        fontSize={14}
        fontcolor="#000"
        fontFamily="PT-Reg"
        text={item.choice}
        marginBottom={10}
        marginTop={10}
      />
    );
  };

  return (
    <View>
      <SectionList
        sections={section}
        keyExtractor={(item, index) => item + index}
        contentContainerStyle={{ alignItems: "center", marginVertical: "7%" }}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderSection}
      />
      <ButtonClick
        text="Next"
        fontSize={24}
        fontFamily="PT-Bold"
        fontcolor="#000000"
        height={39}
        width={245}
        radius={30}
        padding={0}
        marginBottom="10%"
        onPressAction={Checking}
        // shadowRadius={30}
        colorsStart="#7EF192"
        colorsEnd="#2DC897"
      />
      <ModalSubmit
        modalVisible={modalVisible}
        modalText={myScore}
        modalHeader="Your Score is"
        modalButton="Next"
        ModalAction={() => {
          setModalVisible(false);
          Actions.Interest();
        }}
      />
    </View>
  );
};
export default TestBox;

const styles = StyleSheet.create({
  whiteCardChoice: {
    width: Dimensions.get("window").width / 1.15,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: "#ffffff",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
    marginBottom: "10%",
    paddingVertical: 20,
  },
  whiteCardQuestion: {
    width: Dimensions.get("window").width / 1.15,
    justifyContent: "center",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
    paddingVertical: 20,
  },
  textQuestion: {
    fontSize: 16,
    fontFamily: "PT-Bold",
  },
});
