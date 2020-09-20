import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import ReadingApi from "../API/ReadingAPI";
import { AsyncStorage } from "react-native";
import ModalSubmit from "../components/ModalSubmit";


import {
    StyleSheet,
    View,
    ScrollView,
    ImageBackground,
    FlatList,
    Image,
} from "react-native";
import axios from "axios";
import CountViews from "../API/CountViewsAPI";
import ArticleCard from "../components/ArticleCard";
import Constants from "expo-constants";
import Header from "../components/Header";
import { set } from "react-native-reanimated";


const UserAnswer = (props) => {

    const [level, setLevel] = useState("")

    useEffect(() => {
        getValue();
    }, []);

    getValue = async () => {
        var count1 = 0;
        var count2 = 0;
        var count3 = 0;
        try {
            var myArray = await AsyncStorage.getItem('userAnswer1');
            var myArray2 = await AsyncStorage.getItem('userAnswer2');
            var myArray3 = await AsyncStorage.getItem('userAnswer3');
            var myArray4 = await AsyncStorage.getItem('userAnswer4');
            var myArray5 = await AsyncStorage.getItem('userAnswer5');
            var myArray6 = await AsyncStorage.getItem('userAnswer6');

            if (myArray !== null) {
                // We have data!!
                console.log("============userAnswer=================")

                console.log(JSON.parse(myArray));
                console.log(JSON.parse(myArray2));
                console.log(JSON.parse(myArray3));
                console.log(JSON.parse(myArray4));
                console.log(JSON.parse(myArray5));
                console.log(JSON.parse(myArray6));
                console.log("===============userAnswer==============")




            }
        } catch (error) {
            // Error retrieving data
        } finally {
            try {
                var jsonMyArray = JSON.parse(myArray);
                var jsonMyArray2 = JSON.parse(myArray2);

                var jsonMyArray3 = JSON.parse(myArray3);

                var jsonMyArray4 = JSON.parse(myArray4);

                var jsonMyArray5 = JSON.parse(myArray5);

                var jsonMyArray6 = JSON.parse(myArray6);

                for (let index = 0; index < jsonMyArray.length; index++) {
                    if (jsonMyArray[index].value.isRightChoice == "1") {
                        console.log("choice index " + index + " is " + jsonMyArray[index].value.isRightChoice)
                        console.log("1 T")
                        count1 += 1;
                        console.log("++++++++++++++++++")

                    }
                } for (let index = 0; index < jsonMyArray2.length; index++) {
                    if (jsonMyArray2[index].value.isRightChoice == 1) {
                        console.log("choice index " + index + " is " + jsonMyArray2[index].value.isRightChoice)

                        console.log("2 T")

                        count1 += 1;
                        console.log("Total Counrt 1 " + count1)
                    }
                } for (let index = 0; index < jsonMyArray3.length; index++) {
                    if (jsonMyArray3[index].value.isRightChoice == 1) {
                        console.log("choice index " + index + " is " + jsonMyArray3[index].value.isRightChoice)

                        console.log("3 T")

                        count2 += 1;
                    }
                } for (let index = 0; index < jsonMyArray4.length; index++) {
                    if (jsonMyArray4[index].value.isRightChoice == 1) {
                        console.log("choice index " + index + " is " + jsonMyArray4[index].value.isRightChoice)

                        console.log("4 T")

                        count2 += 1;

                        console.log("Total Counrt 2 " + count2)

                    }
                } for (let index = 0; index < jsonMyArray5.length; index++) {
                    if (jsonMyArray5[index].value.isRightChoice == 1) {
                        console.log("choice index " + index + " is " + jsonMyArray5[index].value.isRightChoice)

                        console.log("5 T")

                        count3 += 1;
                    }
                } for (let index = 0; index < jsonMyArray6.length; index++) {
                    if (jsonMyArray6[index].value.isRightChoice == 1) {
                        console.log("choice index " + index + " is " + jsonMyArray6[index].value.isRightChoice)

                        console.log("6 T")

                        count3 += 1;
                        console.log("Total Counrt 3 " + count3)

                    }
                }
            } catch (error) {

            } finally {
                console.log("Score 1 = " + count1)
                console.log("Score 2 = " + count2)
                console.log("Score 3 = " + count3)

            }

        }
        console.log("!!!!!!!!!!!!!!!!")
        console.log("Score 1 = " + count1)
        console.log("Score 2 = " + count2)
        console.log("Score 3 = " + count3)
        if (count1 < 4) {
            setLevel("A1")
        } else if (count1 >= 4 && count2 < 4) {
            setLevel("A2")
        } else if (count3 >= 4) {
            setLevel("B1")
        }
    }
    console.log(level)
    const [modalVisible, setModalVisible] = useState(true);
    return (
        <ScrollView>
            <View>
                < ModalSubmit
                    modalVisible={modalVisible}
                    modalText={level}
                    modalHeader="Your Level is"
                    modalButton="Next"
                    suggestionText="Hi Suggestion"
                    modalAction={() => {
                        setModalVisible(false)
                        Actions.Interest()
                    }}
                />
            </View>
        </ScrollView>
    );
};
export default UserAnswer;