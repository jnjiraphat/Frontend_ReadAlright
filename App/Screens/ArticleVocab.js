import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import { Actions } from "react-native-router-flux";
import ReadingApi from "../API/ReadingAPI";
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


const ArticleVocab = (props) => {
    //   const [readingId, setReadingId] = useState(0);

    //   function goToContentScreen(category_id, user_id, reading_id, vocabBox_id) {
    //     const views = CountViews(category_id, user_id, reading_id, vocabBox_id);
    //     console.log("readingIdddddddddddddddddddddd++++++++++++++");
    //     console.log(reading_id);
    //     Actions.ContentScreen({ text: reading_id });
    //   }

    const [result, setResult] = useState([]);


    const fetch = async () => {
        console.log("runningggggggggggggggggggggggggggggg");
        await axios.get("http://ec2-3-90-114-38.compute-1.amazonaws.com:3000/vocabBox/" + props.text).then(
            (response) => {
                console.log("eiei");
                console.log(response.data.reading);
                //     setCate(response.data.reading);
                //     // setCateName(response.data.reading[0].categoryName);
                //     console.log(cateName);
                setResult(response.data.reading)
            },
            (error) => {
                console.log(error);
            }
        );
    };

    const read = async () => {
        const data = await fetch();
    };
    useEffect(() => {
        read();
        // getSuggestion();
    }, []);
    console.log("This is cate_id vocab");
    console.log(props.text);

    return (
        <View>
            <Text>{props.text}</Text>
        </View>
    );
};
export default ArticleVocab;