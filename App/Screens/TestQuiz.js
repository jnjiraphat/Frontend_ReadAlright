import React from "react";
import {
  StyleSheet,
  Button,
  ScrollView,
  Text,
  View,
  Dimensions,
} from "react-native";
import { SimpleSurvey } from "react-native-simple-survey";
import axios from "axios";

import Constants from "expo-constants";

const GREEN = "rgba(141,196,63,1)";
const PURPLE = "rgba(108,48,237,1)";

export default class TestQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: PURPLE,
      answersSoFar: "",
      quizs: [],
      dataArrayQuiz: [],
    };
    this.fetchAPI();
  }

  onSurveyFinished(answers) {
    const infoQuestionsRemoved = [...answers];

    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value;
    }
    console.log(answers);
  }

  onAnswerSubmitted(answer) {
    this.setState({
      answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2),
    });
  }

  fetchAPI = async () => {
    var dataArrayQuiz = [];
    for (let index = 7; index <= 16; index++) {
      await axios.get("http://10.0.2.2:3000/quiz/" + index).then(
        (response) => {
          console.log(response.data);
          dataArrayQuiz.push(response.data);
          console.log(dataArrayQuiz.length);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.setState({
      quizs: dataArrayQuiz,
    });
  };

  renderPreviousButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <Button
          color={GREEN}
          onPress={onPress}
          disabled={!enabled}
          backgroundColor={GREEN}
          title={"Previous"}
        />
      </View>
    );
  }

  renderNextButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <Button
          color={GREEN}
          onPress={onPress}
          disabled={!enabled}
          backgroundColor={GREEN}
          title={"Next"}
        />
      </View>
    );
  }

  renderFinishedButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}
      >
        <Button
          title={"Finished"}
          onPress={onPress}
          disabled={!enabled}
          color={GREEN}
        />
      </View>
    );
  }

  renderButton(data, index, isSelected, onPress) {
    return (
      <View
        key={`selection_button_view_${index}`}
        style={{ marginTop: 5, marginBottom: 5, justifyContent: "flex-start" }}
      >
        <Button
          title={data.optionText}
          onPress={onPress}
          color={isSelected ? "#FFB777" : "#E68BEC"}
          style={isSelected ? {fontFamily: "PT-Bold"} : {fontFamily : "PT-Reg"}, {borderRadius: 10} }
          key={`button_${index}`}
        />
      </View>
    );
  }

  renderQuestionText(questionText) {
    return (
      <View style={{paddingHorizontal: 40}}>
        <Text numLines={1} style={styles.questionText}>
          {questionText}
        </Text>
      </View>
    );
  }

  renderInfoText(infoText) {
    return (
      <View style={{ marginLeft: 10, marginRight: 10 }}>
        <Text style={styles.infoText}>{infoText}</Text>
      </View>
    );
  }

  render() {
    if (this.state.quizs.length > 0)
      return (
        <View style={styles.background}>
            <Text style={styles.header}>Pre-Test</Text>
            <Text style={styles.subHeader}>
                Fill the gaps with the correct word from the box.
              </Text>
          <View style={styles.whiteCardChoice}>
            <SimpleSurvey
              ref={(s) => {
                this.surveyRef = s;
              }}
              survey={this.state.quizs}
              renderSelector={this.renderButton.bind(this)}
              containerStyle={styles.surveyContainer}
              selectionGroupContainerStyle={styles.selectionGroupContainer}
              navButtonContainerStyle={{
                flexDirection: "row",
                justifyContent: "space-around",
                borderRadius: 10
              }}
              renderPrevious={this.renderPreviousButton.bind(this)}
              renderNext={this.renderNextButton.bind(this)}
              renderFinished={this.renderFinishedButton.bind(this)}
              renderQuestionText={this.renderQuestionText}
              onSurveyFinished={(answers) => this.onSurveyFinished(answers)}
              onAnswerSubmitted={(answer) => this.onAnswerSubmitted(answer)}
              renderTextInput={this.renderTextBox}
              renderNumericInput={this.renderNumericInput}
              renderInfo={this.renderInfoText}
            />
          </View>

          {/* <ScrollView style={styles.answersContainer}>
                                    <Text style={{ textAlign: 'center' }}>JSON output</Text>
                                    <Text>{this.state.answersSoFar}</Text>
                                </ScrollView> */}
        </View>
      );
    else
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    minWidth: "70%",
    maxWidth: "90%",
    alignItems: "stretch",
    justifyContent: "center",

    elevation: 20,
    borderRadius: 10,
    flex: 1,
  },
  answersContainer: {
    width: "90%",
    maxHeight: "20%",
    marginTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: "white",
    elevation: 20,
    borderRadius: 10,
  },
  surveyContainer: {
    width: "auto",
    alignSelf: "center",
    backgroundColor: "white",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    alignContent: "center",
    padding: 5,
    flexGrow: 0,
  },
  selectionGroupContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    alignContent: "flex-end",
  },
  background: {
    flex: 1,
    minHeight: 800,
    maxHeight: 800,
    // justifyContent: 'center',
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
  },
  questionText: {
    marginBottom: 20,
    fontSize: 16,
    alignSelf: "center",
    fontFamily: "PT-Bold",
  },
  header: {
    fontSize: 24,
    fontFamily: "PT-Bold",
    marginTop: "5%"
  },
  subHeader: {
    marginTop: "2%",
    fontSize: 16,
    fontFamily: "PT-Reg",
  },
  whiteCardChoice: {
    width: Dimensions.get("window").width / 1.15,
    borderRadius: 5,
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
    marginVertical: "10%",
    paddingVertical: 20,
  },
//   buttonChoiceNC: {
//     fontFamily: "PT-Reg" ,
//     fontSize: 14
//   },
//   buttonChoiceC: {
//     fontFamily: "PT-Bold" ,
//     fontSize: 14
//   }
});
