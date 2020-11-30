import React from "react";
import { StyleSheet, ScrollView, Text, View, Dimensions } from "react-native";
import { SimpleSurvey } from "react-native-simple-survey";
import axios from "axios";
import ModalSubmit from "../components/ModalSubmit";
import { Actions } from "react-native-router-flux";
import Constants from "expo-constants";
import { Button } from "@ant-design/react-native";
import LoadingScreen from './LoadingScreen'
import * as firebase from "firebase";

const GREEN = "rgba(141,196,63,1)";
const PURPLE = "rgba(108,48,237,1)";

export default class TestQuizChallenge extends React.Component {
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
      dataArrayQuizChallenge: [],
      userId: "",
    };
    this.setUpPage();
      }

  onSurveyFinished(answers) {
    const infoQuestionsRemoved = [...answers];

    const answersAsObj = {};
    for (const elem of infoQuestionsRemoved) {
      answersAsObj[elem.questionId] = elem.value;
    }
    this.setUp();

  }

  onAnswerSubmitted(answer) {
    this.setState({
      answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2),
    });
  }
  setUpPage = async () => {
    await this.fetchApiChallenge();
    await this.fetchAPI();
    await this.getUid();
  
    
  };
  converData() {
    return new Promise((resolve, reject) => {
      var data = JSON.parse(this.state.answersSoFar);

      resolve(data);
    });
  }
  convertJson = async () => {
  
    await this.converData().then((result) => {
      console.log(result.length + "eiei");
      console.log(result);
      this.setState({
        result: result,
      });
    });
  };
  setUp = async () => {
    await this.convertJson();

    await this.checkAnswer();
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
                  user_id: this.state.userId,
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
  fetchAPI = async () => {
    var dataArrayQuiz = [];
    for (
      let index = 0;
      index < this.state.dataArrayQuizChallenge[0].length;
      index++
    ) {
      await axios
        .get(
          "https://readalright-backend.khanysorn.me/quiz/" +
            this.state.dataArrayQuizChallenge[0][index].question_id
        )
        .then(
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

  fetchApiChallenge = async () => {
    var temp = [];

    if (this.state.reading_id != null) {
      await axios
        .get("https://readalright-backend.khanysorn.me/quizInContent/" + this.state.reading_id)
        .then(
          (response) => {
            temp.push(response.data.quiz);
          },
          (error) => {
            console.log(error);
          }
        );
      this.setState({
        dataArrayQuizChallenge: temp,
      });
    } else {
    }
  };

  


  getUid = async () => {
    try {
      var uid = firebase.auth().currentUser.uid;
      this.getUser(uid)
      
    } catch (error) {
      console.log("error getItem")
      
    }
  }

  getUser = async (uuidTemp) => {
    try {

      await axios.get("https://readalright-backend.khanysorn.me/user/" + uuidTemp).then(
        (response) => {
          this.setState({
            userId: response.data.user[0].user_id,
          });
        },
        (error) => {
          console.log("error in get userId")

          console.log(error);
        }
      );
    } catch (error) {
      console.log("error get userId 7")
    } finally{
      console.log("user id in testquizchal")
    }
  }

  renderPreviousButton(onPress, enabled) {
    return (
      <View
        style={{ flexGrow: 1, maxWidth: 110, marginTop: 10, marginBottom: 10 }}
      >
        <Button onPress={onPress} disabled={!enabled} style={styles.buttonFlow}>
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
        <Button style={styles.buttonFlow} onPress={onPress} disabled={!enabled}>
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
        <Button onPress={onPress} disabled={!enabled} style={styles.buttonFlow}>
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
          <Text style={styles.header}>Challenge</Text>
          <Text style={styles.subHeader}>
            Answer the questions from Reading Part.
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
            modalHeader="Your Score is"
            modalButton="Next"
            suggestionText="Hi Suggestion"
            modalAction={() => {
              this.setState({
                modalVisible: false,
              });
              Actions.popTo("ContentScreen");
            }}
          />
        </View>
      );
    else
      return (
        <View style={{flex:1}}>
          <LoadingScreen/>
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
    marginTop: "5%",
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
    backgroundColor: "rgba(141,196,63,1)",
  },
  choiceBgUnSelect: {
    backgroundColor: "rgba(108,48,237,1)",
  },
  buttonFlow: {
    backgroundColor: "rgba(141,196,63,1)",
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
