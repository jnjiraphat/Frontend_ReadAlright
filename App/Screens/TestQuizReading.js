import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
} from "react-native";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import Constants from "expo-constants";
import ButtonClick from "../components/ButtonClick";

const TestQuizReading = (props) => {

  const [index, setIndex] = useState("1");

  function goToTestQuiz(readingId) {
    Actions.TestQuiz({ text: readingId });
  }
  const [readPretest, setReadPretest] = useState([]);

  const fetch = async () => {
    if (props.text != null) {
      await axios.get("https://readalright-backend.khanysorn.me/ReadingPre/" + props.text).then(
        (response) => {
          setReadPretest(response.data.quiz);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      await axios.get("https://readalright-backend.khanysorn.me/ReadingPre/" + index).then(
        (response) => {
          setReadPretest(response.data.quiz);
          setIndex(props.text);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  const read = async () => {
    const data = await fetch();
  };
  useEffect(() => {
    read();
  }, []);
  return (
    <FlatList
      data={readPretest}
      renderItem={({ item, index }) => (
        <>
          <View style={styles.background}>
            <Text style={styles.header}>Pre-Test</Text>
            <Text style={styles.subHeader}>
              Read the headline. Guess if a-c below are true (T) or false (F).
            </Text>
            <View style={styles.whiteCardChoice}>
            <View style={styles.whiteCardArea}>
                <Text style={styles.questionText}>
                  {item.reading_Pretest_id}). {item.content}
                </Text>
              </View>
            </View>
            <ButtonClick
              onPressAction={() => {
                if (props.text != null) {
                  goToTestQuiz(props.text);
                } else {
                  goToTestQuiz(1);
                }
              }}
              text="Ready"
              fontSize={24}
              fontFamily="PT-Bold"
              fontcolor="#000000"
              height={39}
              width={245}
              radius={30}
              padding={0}
              colorsStart="#2DC897"
              colorsEnd="#7EF192"
            />
          </View>
        </>
      )}
      keyExtractor = { (item, index) => index.toString() }
    />
  );
};

export default TestQuizReading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    // flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#FFD686",
    height: "100%",
    minHeight: Dimensions.get("window").height,
  },
  questionText: {
    fontSize: 16,
    alignSelf: "center",
    fontFamily: "PT-Bold",
  },
  header: {
    fontSize: 24,
    fontFamily: "PT-Bold",
    marginTop: "5%",
    alignSelf: "center",
  },
  subHeader: {
    marginTop: "2%",
    fontSize: 16,
    fontFamily: "PT-Reg",
    padding: 20,
  },
  whiteCardChoice: {
    alignSelf: "center",
    width: Dimensions.get("window").width / 1.15,
    borderRadius: 0,
    backgroundColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
    marginBottom: "10%",
    marginTop: "3%",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  whiteCardArea: {
  },
  choiceButton: {
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
