import React from "react";
import { StyleSheet, ScrollView, Text, View, Dimensions } from "react-native";
import { SimpleSurvey } from "react-native-simple-survey";
import axios from "axios";
import ModalSubmit from "../components/ModalSubmit";
import { Actions } from "react-native-router-flux";
import Constants from "expo-constants";
import { Button } from "@ant-design/react-native";
import { AsyncStorage } from "react-native";
import * as firebase from "firebase";

import LoadingScreen from './LoadingScreen'

const GREEN = "rgba(141,196,63,1)";
const PURPLE = "rgba(108,48,237,1)";

function goToQuizReading(readingId) {
  console.log(readingId);
  Actions.TestQuizReading({ text: readingId });

  console.log("hello");
}

export default class TestQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: PURPLE,
      answersSoFar: "",
      quizs: [],
      dataArrayQuiz: [],
      result: [],
      modalVisible: false,
      score: 0,
      correctChoice: [],
      reading_id: this.props.text,
      questionId: [],
      count: 0,
      temp: []
    };
    this.setUpQuestion()

  }


  onSurveyFinished(answers) {
    const infoQuestionsRemoved = [...answers];

    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value;
    }
    setTimeout(() => {
      this.setUp();
    }, 1500);

    if (this.state.reading_id != 6) {
      Actions.TestQuizReading({ text: this.state.reading_id + 1 });
    } else {
      this.editUser();

    }



  }

  onAnswerSubmitted(answer) {

    this.setState({
      count: this.state.count + 1,
      answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2),
    });

  }
  converData() {
    return new Promise((resolve, reject) => {
      var data = JSON.parse(this.state.answersSoFar);

      resolve(data);
    });
  }
  editUser = async () => {
    try {
      var name = firebase.auth().currentUser.displayName;
      var photo = firebase.auth().currentUser.photoURL;
      var uuid = firebase.auth().currentUser.uid
      if (name == null) {
        name = firebase.auth().currentUser.email;
      }
      var response = await axios.put("https://readalright-backend.khanysorn.me/user/updateUser/" + uuid, {
        "regtime": null,
        "username": name,
        "pwd": "Panda",
        "level": "A1",
        "image": photo,
        "uid": uuid,
        "isTested":"true"
      });
    } catch (error) {

    } finally {
      Actions.UserAnswer();

    }


  }
  convertJson = async () => {
    await this.converData().then((result) => {
      try {
        AsyncStorage.setItem("pretest", "true");
        AsyncStorage.setItem('userAnswer' + this.state.reading_id, JSON.stringify(result));
      } catch (error) {
        // Error saving data
      }
      this.setState({
        result: result,
      });
    });
  };
  setUpQuestion = async () => {
    await this.fetchAPIBefore();
    await this.fetchAPI;

  };
  setUp = async () => {
    await this.convertJson();

  };
  checkAnswer = async () => {


    var count = 0;
    setTimeout(() => {
      if (this.state.result.length != 3) {
        this.setUp();
      } else {
        console.log(this.state.result.length + "koko");
        try {
          for (let index = 0; index < this.state.result.length; index++) {
            if (this.state.result[index].value.isRightChoice == 1) {
              count += 1;
            } else {
              axios
                .post("https://readalright-backend.khanysorn.me/answers", {
                  isRightChoice: this.state.result[index].value.isRightChoice,
                  choice: this.state.result[index].value.choice,
                  optionText: this.state.result[index].value.optionText,
                  value: this.state.result[index].value.value,
                  choice_id: this.state.result[index].value.choice_id,
                  question_id: this.state.result[index].value.question_id,
                })
                .then(
                  (response) => {
                    console.log("upload success!!!");
                  },
                  (error) => {
                    console.log(error);
                  }
                );

            }
          }
        } catch (error) {
        } finally {
          this.setState({
            score: count,
            modalVisible: true,
          });
        }
      }
    }, 1500);
  };
  fetchAPIBefore = async () => {
    var dataArrayQuiz2 = [];

    try {

      await axios.get("https://readalright-backend.khanysorn.me/QuizPre/question/reading/" + this.state.reading_id).then(
        (response) => {
          for (let index = 0; index < response.data.quiz.length; index++) {
            dataArrayQuiz2.push(response.data.quiz[index].question_pretest_id);
            
          }
          this.setState({
            questionId: dataArrayQuiz2
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {

    } finally {
      this.fetchAPI()
    }


  };
  fetchAPI = async () => {
    var dataArrayQuiz = [];
    for (let index = 0; index < this.state.questionId.length; index++) {
      await axios.get("https://readalright-backend.khanysorn.me/QuizPre/question/" + this.state.questionId[index]).then(
        (response) => {
          dataArrayQuiz.push(response.data);
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
        style={{ flexGrow: 1, maxWidth: 110, marginTop: 10, marginBottom: 10 }}
      >
        <Button onPress={onPress} disabled={!enabled} style={
          enabled ? styles.buttonFlowEnable : styles.buttonFlow}>
          <Text style={styles.buttonFlowText}>Previous</Text>
        </Button>
      </View>
    );
  }

  renderNextButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 110, marginTop: 10, marginBottom: 10 }}
      >
        <Button style={
          enabled ? styles.buttonFlowEnable : styles.buttonFlow} onPress={onPress} disabled={!enabled}>
          <Text style={styles.buttonFlowText}>Next</Text>
        </Button>
      </View>
    );
  }

  renderFinishedButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 110, marginTop: 10, marginBottom: 10 }}
      >
        <Button onPress={onPress} disabled={!enabled} style={
          enabled ? styles.buttonFlowEnable : styles.buttonFlow}>
          <Text style={styles.buttonFlowText}>Next</Text>
        </Button>
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
          onPress={onPress}
          style={[
            styles.choiceButton,
            isSelected ? styles.choiceBgSelected : styles.choiceBgUnSelect,
          ]}
          key={`button_${index}`}
        >
          <Text style={styles.choiceText}>{data.optionText}</Text>
        </Button>
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

  renderQuestionText(questionText) {
    return (
      <View style={{ paddingHorizontal: 40 }}>
        <Text numLines={1} style={styles.questionText}>
          {questionText}
        </Text>
      </View>
    );
  }

  render() {
    if (this.state.quizs.length > 0)
      return (
        <View style={styles.background}>
          <Text style={styles.header}>Pre-Test</Text>
          <Text style={styles.subHeader}>
            Read the headline. Guess if a-c below are true (T) or false (F).
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
                borderRadius: 10,
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
          <ModalSubmit
            modalVisible={this.state.modalVisible}
            modalText={this.state.score}
            modalHeader="Your Level is"
            modalButton="Next"
            suggestionText="Hi 
            tion"
            modalAction={() => {

              this.setState({
                modalVisible: false,
              });
              Actions.Interest();
            }}
          />
        </View>
      );
    else
      return (
        <View style={{ flex: 1 }}>
          <LoadingScreen />
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
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
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
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#FFD686",
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
    marginTop: "5%",
  },
  subHeader: {
    marginTop: "2%",
    fontSize: 16,
    fontFamily: "PT-Reg",
    padding: 20
  },
  whiteCardChoice: {
    width: Dimensions.get("window").width / 1.15,
    borderRadius: 0,
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
  choiceBgSelected: {
    backgroundColor: "#F24FFD",
  },
  choiceBgUnSelect: {
    backgroundColor: "#FFC258",
  },
  buttonFlow: {
    backgroundColor: "#FFD686",
  },
  buttonFlowEnable: {
    backgroundColor: "#44E05F",
  },
  choiceText: {
    fontFamily: "PT-Bold",
    color: "#fff",
  },
  buttonFlowText: {
    fontFamily: "PT-Bold",
    color: "#fff",
  },

  
});
