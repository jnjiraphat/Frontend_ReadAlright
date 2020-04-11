import React  from "react";
import {
StyleSheet,
Text,
View
} from "react-native";
import {Actions} from "react-native-router-flux";

const Tricks = () => {
    return (
        <View style = {style.container}>
            <Text style =  {style.welcome}>
            Tricks
            </Text>
        </View>
    )
};

const style = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : "center",
        alignItems : "center",
        backgroundColor : "#bb0000"
    },
    welcome : {
        fontSize : 20,
        textAlign : "center",
        margin: 10,
        color: "#ffffff"

    }
});

export default Tricks;