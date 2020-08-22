import React from 'react'
import { StyleSheet, Button, ScrollView, Text, TextInput, View } from 'react-native';
import { SimpleSurvey } from 'react-native-simple-survey';

import Constants from "expo-constants";

const GREEN = 'rgba(141,196,63,1)';
const PURPLE = 'rgba(108,48,237,1)';

const survey = [
   
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
            this.state = { backgroundColor: PURPLE, answersSoFar: '' };
        }
        

        onSurveyFinished(answers) {
            const infoQuestionsRemoved = [...answers];

            // Convert from an array to a proper object. This won't work if you have duplicate questionIds
            const answersAsObj = {};
            for (const elem of infoQuestionsRemoved) { answersAsObj[elem.questionId] = elem.value; }
        }
    
        /**
         *  After each answer is submitted this function is called. Here you can take additional steps in response to the 
         *  user's answers. From updating a 'correct answers' counter to exiting out of an onboarding flow if the user is 
         *  is restricted (age, geo-fencing) from your app.
         */
        onAnswerSubmitted(answer) {
            this.setState({ answersSoFar: JSON.stringify(this.surveyRef.getAnswers(), 2) });
        }
    

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
    
        // renderInfoText(infoText) {
        //     return (
        //         <View style={{ marginLeft: 10, marginRight: 10 }}>
        //             <Text style={styles.infoText}>{infoText}</Text>
        //         </View>
        //     );
        // }
    
        render() {
            return (
                <View style={[styles.background]}>
                    <View >
                        <SimpleSurvey
                            ref={(s) => { this.surveyRef = s; }}
                            survey={survey}
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
                            // renderTextInput={this.renderTextBox}
                            // renderNumericInput={this.renderNumericInput}
                            // renderInfo={this.renderInfoText}
                        />
                        
                    </View>
                    
                    {/* <ScrollView style={styles.answersContainer}>
                        <Text style={{textAlign:'center'}}>JSON output</Text>
                        <Text>{this.state.answersSoFar}</Text>
                    </ScrollView> */}
                    
                </View>
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