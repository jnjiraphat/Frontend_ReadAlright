import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text } from "react-native";
import {
    View,
} from "react-native";
import axios from "axios";


const ArticleVocab = (props) => {

    const [result, setResult] = useState([]);


    const fetch = async () => {
        await axios.get("https://readalright-backend.khanysorn.me/vocabBox/" + props.text).then(
            (response) => {
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