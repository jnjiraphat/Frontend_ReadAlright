import React, { useEffect } from 'react'
import {SafeAreaView, Text, StyleSheet,View, TextInput, Alert} from 'react-native'
import Constants from 'expo-constants'
import { useForm, Controller } from "react-hook-form";

import ButtonClick from "../components/ButtonClick"

const Login = () => {
    
    const { control,register, handleSubmit, setValue, errors } = useForm();
    const onSubmit = data => {
        console.log(data)
    };

    return (
        <SafeAreaView style={styles.container}>
            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    placeholder="Username"
                    style={styles.textInput}
                />
                )}
                name="username"
                rules={{ required: true }}
                defaultValue=""
            />
            {errors.username && <Text style={styles.errorArea}>This is required.</Text>}
            
            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                <TextInput
                    style={styles.input}
                    onBlur={onBlur}
                    onChangeText={value => onChange(value)}
                    value={value}
                    placeholder="Password"
                    style={styles.textInput}
                />
                )}
                name="password"
                rules={{ required: true }}
                defaultValue=""
            />
            {errors.password && <Text style={styles.errorArea}>This is required.</Text>}

            <View style={styles.forgotArea}>
                <Text style={styles.forgot}>FORGOT PASSWORD?</Text>
                <Text style={styles.forgot}>Register</Text>
            </View>
            <ButtonClick
                text="LOGIN"
                fontSize={18}
                fontFamily="PT-Bold"
                fontcolor="#000"
                height={39}
                width={275}
                radius={30}
                padding={0}
                marginBottom="5%"
                colorsStart="#FFB74E"
                colorsEnd="#FFB74E"
                onPressAction={handleSubmit(onSubmit)}
            />
            <View style={styles.textBar}>
                <View style={styles.hr}/>
                <Text style={styles.title}>OR CONNECT WITH</Text>
                <View style={styles.hr}/>
            </View>
            <ButtonClick
                text="Facebook"
                fontSize={18}
                fontFamily="PT-Bold"
                fontcolor="#ffffff"
                height={39}
                width={275}
                radius={30}
                padding={0}
                marginBottom="2%"
                marginTop="5%"
                colorsStart="#4666D5"
                colorsEnd="#4666D5"
                // onPressAction={goToHome}
            />
            <ButtonClick
                text="Google"
                fontSize={18}
                fontFamily="PT-Bold"
                fontcolor="#ffffff"
                height={39}
                width={275}
                radius={30}
                padding={0}
                colorsStart="#FF3E30"
                colorsEnd="#FF3E30"
                // onPressAction={goToHome}
            />
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        justifyContent: "center"
    },
    title: {
        fontSize: 14,
        paddingLeft: 5,
        fontFamily: "PT-Bold",
    },
    hr: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginLeft: 5,
        marginRight: 5,
        width: 66,
        alignSelf: "center"
    },
    textBar: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        
    },
    textInput: {
        width: 275,
        height: 40,
        borderRadius: 30,
        fontSize: 16,
        borderColor: "#D9D9D9",
        borderWidth: 1,
        alignSelf: "center",
        marginVertical: "2%",
        paddingLeft: 10,
        fontFamily: "PT-Reg"
    },
    forgot: {
        fontFamily: 'PT-Reg',
        fontSize: 14,
        color: "#000",
        marginVertical: "5%",
        alignSelf: "flex-end"
    },
    errorArea: {
        width: 275,
        alignSelf: "center",
        color: "red",
        fontFamily: "PT-Reg"
    },
    forgotArea: {
        width: 275,
        alignSelf: "center",
    }
    
})