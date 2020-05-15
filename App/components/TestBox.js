import React, { Component } from "react";
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
} from "react-native";
import ButtonClick from "../components/ButtonClick";
import ChoiceAPI from "../API/ChoiceAPI";
import axios from "axios";

const TestBox = (props) => {
  // const [answer, setAnswer] = useState([]);

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

  useEffect(() => {
    // Answer();
    // loopId();
  }, []);

  const renderSection = ({ item }) => {
    return (
      <View style={styles.whiteCardChoice}>
        <View style={{ width: Dimensions.get("window").width / 1.35 }}>
          <FlatList
            // title={item.question}
            data={item.choice}
            numColumns={2}
            renderItem={({ item }) => (
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
            )}
            keyExtractor={(item, index) => item + index}
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
