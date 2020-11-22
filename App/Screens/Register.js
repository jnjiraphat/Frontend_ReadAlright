import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { useForm, Controller } from "react-hook-form";
import * as firebase from "firebase";
import { AsyncStorage } from "react-native";
import Loader from "../assets/icon.png";

import ButtonClick from "../components/ButtonClick";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import { NetInfo } from "react-native";

const Register = () => {
  const { control, register, handleSubmit, setValue, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    createAccount(data);
    // Actions.Interest();
  };

  async function createAccount(data) {
    // setUpUser()
    try {
      const username = data.username;
      const email = data.email;
      const password = data.password;
      if (data !== null) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
        axios
          .post("http://ec2-3-90-114-38.compute-1.amazonaws.com:3000/user", {
            regtime: null,
            username: data.name,
            pwd: "A1",
            level: "A1",
            image: null,
            isTested:"false"
          })
          .then(
            (response) => {
              console.log("post user success!!!");
              console.log(response);
            },
            (error) => {
              console.log(error);
            }
          );
      }
      console.log(username);
      console.log(email);
      console.log(password);
    } catch ({ message }) {
      alert(`CreateAccount Error: ${message}`);
    } finally {
      console.log("Go to login")
      Actions.Login();
      // goToInterest();
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Loader} style={styles.img} />
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Username"
            style={styles.textInput}
          />
        )}
        name="username"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.username && (
        <Text style={styles.errorArea}>This is required.</Text>
      )}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Email"
            style={styles.textInput}
          />
        )}
        name="email"
        rules={{ required: true, pattern: /^\S+@\S+$/i }}
        defaultValue=""
      />
      {errors.email && errors.email.type === "required" && (
        <Text style={styles.errorArea}>This is required.</Text>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <Text style={styles.errorArea}>Enter a valid email address.</Text>
      )}

      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="Password"
            secureTextEntry={true}
            style={styles.textInput}
          />
        )}
        name="password"
        rules={{ required: true, minLength: 8 }}
        defaultValue=""
      />
      {errors.password && errors.password.type === "minLength" && (
        <Text style={styles.errorArea}>
          This is field required min lenght of 8.
        </Text>
      )}
      {errors.password && errors.password.type === "required" && (
        <Text style={styles.errorArea}>This is required.</Text>
      )}
      <ButtonClick
        text="REGISTER"
        fontSize={18}
        fontFamily="PT-Bold"
        fontcolor="#000"
        height={39}
        width={275}
        radius={30}
        padding={0}
        marginTop="5%"
        colorsStart="#FFB74E"
        colorsEnd="#FFB74E"
        onPressAction={handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    paddingLeft: 5,
    fontFamily: "PT-Bold",
  },
  hr: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginLeft: 5,
    marginRight: 5,
    width: 66,
    alignSelf: "center",
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
    fontFamily: "PT-Reg",
  },
  forgot: {
    fontFamily: "PT-Reg",
    fontSize: 14,
    color: "#000",
    marginVertical: "5%",
    alignSelf: "flex-end",
  },
  errorArea: {
    width: 275,
    alignSelf: "center",
    color: "red",
    fontFamily: "PT-Reg",
  },
  forgotArea: {
    width: 275,
    alignSelf: "center",
  },
  img: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
});
