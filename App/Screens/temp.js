import React from 'react'
import { StyleSheet, Button, ScrollView, Text, TextInput, View } from 'react-native';
import { SimpleSurvey } from 'react-native-simple-survey';
import axios from "axios";
import Constants from "expo-constants";
import { useState } from 'react';
import ModalSubmit from "../components/ModalSubmit";
import { Actions } from "react-native-router-flux";


const GREEN = 'rgba(141,196,63,1)';
const PURPLE = 'rgba(108,48,237,1)';


// const [quizs, setQuiz] = useState([]);
// const dataArrayQuiz = [];

// const Question = async () => {
//     for (let index = 7; index <= 16; index++) {
//       await axios.get("http://10.0.2.2:3000/quiz/" + index).then(
//         (response) => {
//           console.log("------------------question------------------" + index);
//           console.log(response.data);
//           dataArrayQuiz.push(response.data);
//           console.log(dataArrayQuiz.length);
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//     }
//     setQuiz(dataArrayQuiz);
//   };

//   async function getQuizAndAnswer() {
//     await Question();
//   }

//   useEffect(() => {
//     getQuizAndAnswer();
//   }, []);




const survey = [

    {
        questionType: 'SelectionGroup',
        questionText:
            'What is your favorite pet?',
        questionId: 'favoritePet',
        options: [
            {
                optionText: 'Dogs',
                value: 'dog'
            },
            {
                optionText: 'Cats',
                value: 'cat'
            },
            {
                optionText: 'Ferrets',
                value: 'ferret'
            },
            {
                optionText: 'Snakes',
                value: 'snake'
            },
            {
                optionText: 'Guinea pigs',
                value: 'guinea'
            }
        ]
    },
    {
        questionType: 'SelectionGroup',
        questionText:
            'Naturally Simple Survey also has multiple choice questions. By default they acts like checkboxes, answers can be selected and deselected.\n\nWhat is your favorite pet?',
        questionId: 'favoritePet',
        options: [
            {
                optionText: 'Dogs',
                value: 'dog'
            },
            {
                optionText: 'Cats',
                value: 'cat'
            },
            {
                optionText: 'Ferrets',
                value: 'ferret'
            },
            {
                optionText: 'Snakes',
                value: 'snake'
            },
            {
                optionText: 'Guinea pigs',
                value: 'guinea'
            }
        ]
    },
];



export default class TestQuiz extends React.Component {

    constructor(props) {
        super(props);
        this.state = { backgroundColor: PURPLE, answersSoFar: '', quizs: [], dataArrayQuiz: [], result: [], modalVisible: false, score: 0 };
        this.fetchAPI()

    }


    onSurveyFinished = async (answers) => {
        const infoQuestionsRemoved = [...answers];

        // Convert from an array to a proper object. This won't work if you have duplicate questionIds
        const answersAsObj = {};
        for (const elem of infoQuestionsRemoved) { answersAsObj[elem.questionId] = elem.value; }
        // console.log(answers);
        this.setUp()

        // console.log(this.state.result.length)
    }
    converData() {

        return new Promise(
            (resolve, reject) => {
                var data = JSON.parse(this.state.answersSoFar)

                resolve(data)
            });

    }
    convertJson = async () => {
        // console.log(this.state.answersSoFar.length)

        await this.converData().then((result) => {
            console.log(result.length + "eiei")
            this.setState({
                result: result,
            });
        })
        // console.log(this.state.result.length + "eiei")

    }
    setUp = async () => {

        await this.convertJson();


        await this.checkAnswer();
    }
    /**
     *  After each answer is submitted this function is called. Here you can take additional steps in response to the 
     *  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is 
     *  is restricted (age, geo-fencing) from your app.
     */
    onAnswerSubmitted(answer) {
        this.setState({ answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2) });
        // <TestBox section={this.state.quizs} />
    }


    fetchAPI = async () => {
        var dataArrayQuiz = [];
        for (let index = 7; index <= 16; index++) {
            await axios.get("http://ec2-3-90-114-38.compute-1.amazonaws.com:3000/quiz/" + index).then(
                (response) => {
                    // console.log("------------------question------------------" + index);
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
            quizs: dataArrayQuiz
        })
    }
    checkAnswer = async () => {
        var count = 0;
        setTimeout(() => {
            if (this.state.result.length != 10) {
                this.setUp();
            } else {
                console.log(this.state.result.length + "koko")
                try {
                    for (let index = 0; index < this.state.result.length; index++) {
                        if (this.state.result[index].value.value == "took") {
                            count += 1
                        } else if (this.state.result[index].value.value == "instructions") {
                            count += 1

                        } else if (this.state.result[index].value.value == "compulsory") {
                            count += 1

                        } else if (this.state.result[index].value.value == "friendless") {
                            count += 1

                        } else if (this.state.result[index].value.value == "population") {
                            count += 1

                        } else if (this.state.result[index].value.value == "impression") {
                            count += 1

                        } else if (this.state.result[index].value.value == "atmosphere") {
                            count += 1

                        } else if (this.state.result[index].value.value == "consists?") {
                            count += 1

                        } else if (this.state.result[index].value.value == "pay") {
                            count += 1

                        } else if (this.state.result[index].value.value == "addition") {
                            count += 1

                        }
                    }
                } catch (error) {
                    
                } finally {
                    this.setState({
                        score: count,
                        modalVisible: true
                    })
                }
            }
        }, 1500);


    }
    // setUp() {
    //     var data = this.state.quizs.map(function (item) {
    //         return {
    //             questionType: 'SelectionGroup',
    //             questionText: item.quiz[0].question
    //             ,
    //             options: [
    //                 {
    //                     optionText: item.choice,
    //                     value: item.choice
    //                 },
    //             ]
    //         };
    //     });
    //     console.log("data------------------------")
    //     console.log(data)
    // }



    renderPreviousButton(onPress, enabled) {
        return (
            <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
                <Button
                    color={GREEN}
                    onPress={onPress}
                    disabled={!enabled}
                    backgroundColor={GREEN}
                    title={'Previous'}
                />
            </View>
        );
    }

    renderNextButton(onPress, enabled) {
        return (
            <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
                <Button
                    color={GREEN}
                    onPress={onPress}
                    disabled={!enabled}
                    backgroundColor={GREEN}
                    title={'Next'}
                />
            </View>
        );
    }

    renderFinishedButton(onPress, enabled) {
        return (
            <View style={{ flexGrow: 1, maxWidth: 100, marginTop: 10, marginBottom: 10 }}>
                <Button
                    title={'Finished'}
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
                style={{ marginTop: 5, marginBottom: 5, justifyContent: 'flex-start' }}
            >
                <Button
                    title={data.optionText}
                    onPress={onPress}
                    color={isSelected ? GREEN : PURPLE}
                    style={isSelected ? { fontWeight: 'bold' } : {}}
                    key={`button_${index}`}
                />
            </View>
        );
    }

    renderQuestionText(questionText) {
        return (
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <Text numLines={1} style={styles.questionText}>{questionText}</Text>
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
                <View style={[styles.background]}>
                    <View >
                        <SimpleSurvey
                            ref={(s) => { this.surveyRef = s; }}
                            survey={this.state.quizs}
                            renderSelector={this.renderButton.bind(this)}
                            containerStyle={styles.surveyContainer}
                            selectionGroupContainerStyle={styles.selectionGroupContainer}
                            navButtonContainerStyle={{ flexDirection: 'row', justifyContent: 'space-around' }}
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
                    {/* <TestBox section={this.state.quizs} /> */}
                    <ScrollView style={styles.answersContainer}>
                        <Text style={{ textAlign: 'center' }}>JSON output</Text>
                        <Text>{this.state.answersSoFar}</Text>
                    </ScrollView>
                    <ModalSubmit
                        modalVisible={this.state.modalVisible}
                        modalText={this.state.score}
                        modalHeader="Your Score is"
                        modalButton="Next"
                        ModalAction={() => {
                            this.setState({

                                modalVisible: false
                            })
                            Actions.Interest();
                        }}
                    />
                </View>
            );
        else return (
            <View><Text>Loading</Text></View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        minWidth: '70%',
        maxWidth: '90%',
        alignItems: 'stretch',
        justifyContent: 'center',

        elevation: 20,
        borderRadius: 10,
        flex: 1,
    },
    answersContainer: {
        width: '90%',
        maxHeight: '20%',
        marginTop: 50,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 20,
        backgroundColor: 'white',
        elevation: 20,
        borderRadius: 10,
    },
    surveyContainer: {
        width: 'auto',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        alignContent: 'center',
        padding: 5,
        flexGrow: 0,
        marginTop: Constants.statusBarHeight,
    },
    selectionGroupContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
        alignContent: 'flex-end',
    },
    background: {
        flex: 1,
        minHeight: 800,
        maxHeight: 800,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    questionText: {
        marginBottom: 20,
        fontSize: 20
    },

});