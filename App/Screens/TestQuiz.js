import React from "react";
import { StyleSheet, ScrollView, Text, View, Dimensions } from "react-native";
import { SimpleSurvey } from "react-native-simple-survey";
import axios from "axios";
import ModalSubmit from "../components/ModalSubmit";
import { Actions } from "react-native-router-flux";
import Constants from "expo-constants";
import { Button } from "@ant-design/react-native";

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
      result: [],
      modalVisible: false,
      score: 0,
      correctChoice: [],
      reading_id: this.props.text,
    };
    this.fetchAPI();
    this.fetchReading();
    // console.log("This is  " + this.reading_id);
  }

  onSurveyFinished(answers) {
    const infoQuestionsRemoved = [...answers];

    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value;
    }
    this.setUp();

    // console.log(answers);
  }

  onAnswerSubmitted(answer) {
    this.setState({
      answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2),
    });
  }
  converData() {
    return new Promise((resolve, reject) => {
      var data = JSON.parse(this.state.answersSoFar);

      resolve(data);
    });
  }
  convertJson = async () => {
    // console.log(this.state.answersSoFar.length)

    await this.converData().then((result) => {
      console.log(result.length + "eiei");
      console.log(result);
      this.setState({
        result: result,
      });
    });
    // console.log(this.state.result.length + "eiei")
  };
  setUp = async () => {
    await this.convertJson();

    await this.checkAnswer();
  };
  checkAnswer = async () => {
    // var tempCorrectChoice = [];
    // for (let index = 0; index <= 100; index++) {
    //     await axios.get("http://10.0.2.2:3000/correctChoices").then(
    //         (response) => {
    //             console.log(response.data);
    //             tempCorrectChoice.push(response.data);
    //             console.log(tempCorrectChoice.length);
    //         },
    //         (error) => {
    //             console.log(error);
    //         }
    //     );
    // }
    // this.setState({
    //    correctChoice: tempCorrectChoice,
    // });
    // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++")
    // console.log(correctChoice)
    // this.setState({
    //     quizs: dataArrayQuiz,
    // });
    var count = 0;
    setTimeout(() => {
      if (this.state.result.length != 18) {
        this.setUp();
      } else {
        console.log(this.state.result.length + "koko");
        try {
          for (let index = 0; index < this.state.result.length; index++) {
            console.log(
              "index--" +
                this.state.result[index] +
                " is " +
                this.state.result[index].value.value
            );
            if (this.state.result[index].value.isRightChoice == 1) {
              count += 1;
              console.log(
                "index " +
                  this.state.result[index] +
                  " is " +
                  this.state.result[index].value.isRightChoice
              );
            } else {
              axios
                .post("http://10.0.2.2:3000/answers", {
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

              console.log(
                "index " +
                  this.state.result[index] +
                  " is " +
                  this.state.result[index].value.isRightChoice +
                  " is wrong"
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
  fetchAPI = async () => {
    var dataArrayQuiz = [];
    for (let index = 1; index <= 6; index++) {}

    for (let index = 1; index <= 18; index++) {
      await axios.get("http://10.0.2.2:3000/QuizPre/question/" + index).then(
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
  fetchReading = async () => {
    console.log("runningggggggggggggggggggggggggggggg");
    await axios.get("http://10.0.2.2:3000/ReadingPre").then(
      (response) => {
        console.log("eiei");
        console.log(response.data.quiz);
      },
      (error) => {
        console.log(error);
      }
    );
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
          <Text style={styles.buttonFlowText}>Finish</Text>
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
            {/* {this.state.reading_id} */}
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
            suggestionText="Hi Suggestion"
            modalAction={() => {
              this.setState({
                modalVisible: false,
              });
              Actions.Interest();
            }}
          />
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
    // justifyContent: 'center',
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
    backgroundColor: "#FFC258",
  },
  choiceBgUnSelect: {
    backgroundColor: "#E68BEC",
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

  //   buttonChoiceNC: {
  //     fontFamily: "PT-Reg" ,
  //     fontSize: 14
  //   },
  //   buttonChoiceC: {
  //     fontFamily: "PT-Bold" ,
  //     fontSize: 14
  //   }
});
