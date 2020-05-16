import React, { Component, useCallback } from "react";
import { useState, useEffect } from "react";

import {
  Text,
  TouchableOpacity,
  View,
  SectionList,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ButtonClick from "../components/ButtonClick";
import ChoiceAPI from "../API/ChoiceAPI";
import axios from "axios";

const TestBox = (props) => {
  // const array = [];
  const { section } = props;
  // console.log(quizs);
  // console.log(quizs.length);

  // var data = quizs.map(function (item) {
  //   return {
  //     title: item.question,
  //     data: [{}],
  //   };
  // });
  // console.log(data);
  // const loopId = async () => {
  //   for (let index = 0; index < quizs.length; index++) {
  //     array.push(quizs[index].question_id);
  //   }
  //   console.log(" quiz length = " + array.length);

  // };

  // const Answer = async () => {
  //   for (let index = 1; index <= 6; index++) {
  //     axios.get("http://10.0.2.2:3000/answers/quizs/" + index).then(
  //       (response) => {
  //         console.log("------------------------------------" + index);
  //         console.log(response.data.answer);
  //         console.log("------------------------------------");
  //       },
  //       (error) => {
  //         console.log(error);
  //       }
  //     );
  //   }

  //   // setAnswer();
  // };

  function Item({
    choice_id,
    choice,
    selected,
    onSelect,
    isRightChoice,
    question_id,
  }) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          // justifyContent: "center",
          marginBottom: 10,
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => onSelect({ choice_id, isRightChoice, question_id })}
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

  // const [selected, setSelected] = React.useState(null);
  // const onSelect = (choice_id) => {
  //   setSelected(choice_id);
  //   console.log(selected);
  // };

  // const onSelect = React.useCallback(
  //   (choice_id) => {
  //     const newSelected = new Map(selected);

  //     newSelected.set(choice_id, !selected.get(choice_id));

  //     setSelected(choice_id);
  //   },
  //   console.log(selected)
  // );
  const [score, setScore] = React.useState(new Map());
  const [selected, setSelected] = React.useState(0);
  // const [currentQuiz, setCurrent] = React.useState(0);
  // const [prevQuiz, setPrev] = React.useState(0);
  const onSelect = ({ choice_id, isRightChoice, question_id }) => {
    setSelected(choice_id);
    // setCurrent(question_id);
    putScore(isRightChoice);
  };

  // const putScore = React.useCallback(
  //   (isRightChoice) => {
  //     const newScore = new Map(score);
  //     newScore.set(isRightChoice, !score.get(isRightChoice));

  //     setScore(newScore);
  //   },
  //   [setScore],
  //   console.log(setScore)
  // );
  // const putScore = (isRightChoice) => {
  //   let array = [1, 2, 3, 4, 5];
  //   // Getting sum of numbers.
  //   let sum = array.reduce(function (a, b) {
  //     return a + b;
  //   }, 0);
  //   console.log(sum);

  // if (currentQuiz !== prevQuiz){
  //   if (isRightChoice === 1) {
  //     setScore(score + 1);
  //   } else if (isRightChoice === 0) {
  //     setScore(score + 0);
  //   }
  // } else if(currentQuiz === prevQuiz){
  //   if (isRightChoice === 1) {
  //     setScore(score + 0);
  //   } else if (isRightChoice === 0) {
  //     setScore(score - 1);
  //   }
  // }
  // };

  useEffect(() => {
    console.log(selected);
    // console.log(score);
  });

  const renderSection = ({ item }) => {
    // if (item.choice_id == selected) {

    // }
    return (
      <View style={styles.whiteCardChoice}>
        <View style={{ width: Dimensions.get("window").width / 1.35 }}>
          <FlatList
            // title={item.question}
            data={item.choice}
            numColumns={2}
            renderItem={({ item }) => (
              <Item
                choice={item.choice}
                choice_id={item.choice_id}
                question_id={item.question_id}
                isRightChoice={item.isRightChoice}
                onSelect={onSelect}
                selected={selected === item.choice_id}
              />
            )}
            keyExtractor={(item) => item.choice_id}
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
            // title={item.question}
            data={section.quiz}
            renderItem={({ item }) => (
              <Text style={styles.textQuestion}>{item.question}</Text>
            )}
            // keyExtractor={keyExtractor}
          />
        </View>
      </View>
    );
  };

  const renderListItem = ({ item }) => {
    return (
      <ButtonClick
        // onPressAction={}
        colorsStart="#E9B0FF"
        colorsEnd="#8A63E5"
        // padding=
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

  // const keyExtractor = (item) => {
  //   return item.choice;
  // };

  // render()
  return (
    <SectionList
      sections={section}
      keyExtractor={(item, index) => item + index}
      contentContainerStyle={{ alignItems: "center", marginVertical: "7%" }}
      renderSectionHeader={renderSectionHeader}
      // renderSectionHeader={renderSection}
      renderItem={renderSection}
    />
  );
};
export default TestBox;

const styles = StyleSheet.create({
  whiteCardChoice: {
    // flex: 1,
    width: Dimensions.get("window").width / 1.15,
    // justifyContent: "center",
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
    // flex: 1,
    width: Dimensions.get("window").width / 1.15,
    justifyContent: "center",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: "#ffffff",
    // alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
    // marginBottom: 10,
    // marginVertical: 20,
    paddingVertical: 20,
  },
  textQuestion: {
    fontSize: 16,
    fontFamily: "PT-Bold",
  },
});
