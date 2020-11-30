import React, { useEffect, useState } from "react";
import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native";
import ModalSubmit from "../components/ModalSubmit";


import {
    View,
    ScrollView,
} from "react-native";


const UserAnswer = (props) => {

    const [level, setLevel] = useState("")

    useEffect(() => {
        getValue();
    }, []);

   const getValue = async () => {
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
                        count1 += 1;

                    }
                } for (let index = 0; index < jsonMyArray2.length; index++) {
                    if (jsonMyArray2[index].value.isRightChoice == 1) {
                        count1 += 1;
                    }
                } for (let index = 0; index < jsonMyArray3.length; index++) {
                    if (jsonMyArray3[index].value.isRightChoice == 1) {
                        count2 += 1;
                    }
                } for (let index = 0; index < jsonMyArray4.length; index++) {
                    if (jsonMyArray4[index].value.isRightChoice == 1) {
                        count2 += 1;
                    }
                } for (let index = 0; index < jsonMyArray5.length; index++) {
                    if (jsonMyArray5[index].value.isRightChoice == 1) {
                        count3 += 1;
                    }
                } for (let index = 0; index < jsonMyArray6.length; index++) {
                    if (jsonMyArray6[index].value.isRightChoice == 1) {
                        count3 += 1;
                    }
                }
            } catch (error) {

            } finally {
            }

        }
        if (count1 < 4) {
            AsyncStorage.setItem('level',"A1")

            setLevel("A1")
        } else if (count1 >= 4 && count2 < 4) {
            AsyncStorage.setItem('level',"A2")

            setLevel("A2")
        } else if (count3 >= 4) {
            AsyncStorage.setItem('level',"B1")

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