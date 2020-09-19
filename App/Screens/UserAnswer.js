import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import ReadingApi from "../API/ReadingAPI";
import { AsyncStorage } from "react-native";

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


const UserAnswer = (props) => {



    useEffect(() => {
        getValue();
    }, []);

    getValue = async () => {
        var count = 0;
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
                        console.log("1 T")
                        count += 1;
                        console.log("++++++++++++++++++")

                    }
                } for (let index = 0; index < jsonMyArray2.length; index++) {
                    if (jsonMyArray2[index].value.isRightChoice == 1) {
                        console.log("2 T")

                        count += 1;
                    }
                } for (let index = 0; index < jsonMyArray3.length; index++) {
                    if (jsonMyArray3[index].value.isRightChoice == 1) {
                        console.log("3 T")

                        count += 1;
                    }
                } for (let index = 0; index < jsonMyArray4.length; index++) {
                    if (jsonMyArray4[index].value.isRightChoice == 1) {
                        console.log("4 T")

                        count += 1;
                    }
                } for (let index = 0; index < jsonMyArray5.length; index++) {
                    if (jsonMyArray5[index].value.isRightChoice == 1) {
                        console.log("5 T")

                        count += 1;
                    }
                } for (let index = 0; index < jsonMyArray6.length; index++) {
                    if (jsonMyArray6[index].value.isRightChoice == 1) {
                        console.log("6 T")

                        count += 1;
                    }
                }
            } catch (error) {

            } finally {
                console.log("Score = " + count)
            }

        }
    }
    return (
        <ScrollView
        >
        </ScrollView>
    );
};
export default UserAnswer;