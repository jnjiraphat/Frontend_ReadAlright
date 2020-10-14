import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import Constants from "expo-constants";
import { useForm, Controller } from "react-hook-form";
import * as Facebook from "expo-facebook";
import * as firebase from "firebase";
import { AsyncStorage } from "react-native";
import Loader from "../assets/icon.png";

import ButtonClick from "../components/ButtonClick";
import { Actions } from "react-native-router-flux";
import axios from "axios";

const Login = () => {
  // const FACEBOOK_APP_ID = '791616524971373';

  // const auth = firebase.auth();
  // // Enter your Firebase app web configuration settings here.
  // async function loginWithFacebook() {
  //     await Facebook.initializeAsync({
  //         appId: '791616524971373', appName: 'readalright'
  //     });        //ENTER YOUR APP ID
  //     const { type, token } = await Facebook.logInWithReadPermissionsAsync({ permissions: ['public_profile'] })

  //     if (type == 'success') {

  //         const credential = firebase.auth.FacebookAuthProvider.credential(token)

  //         firebase.auth().signInWithCredential(credential).catch((error) => {
  //             console.log(error)
  //         })
  //     }
  // }
  // async function logOut() {
  //     Facebook.log
  // }
  const [userName, setUserName] = useState([]);
  const [picURL, setPicURL] = useState([]);

  function goToInterest() {
    console.log("Goto Interest");
    Actions.Interest();
    console.log("hello");
  }

  function goToRegister() {
    Actions.Register();
  }

  const setUpUser = async () => {
    await this.logIn();
    await this.postUser();
  };

  const postUser = async () => {
    console.log("postUser");
    console.log(userName);
    axios
      .post("http://10.0.2.2:3000/users", {
        regtime: null,
        username: "userName",
        pwd: "A1",
        level: "A1",
        image: "picURL",
      })
      .then(
        (response) => {
          console.log("post user success!!!");
          console.log(respose);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  async function logIn() {
    // setUpUser()
    try {
      await Facebook.initializeAsync("791616524971373");
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture`
        );
        const data = await response.json();
        console.log(data);
        // Alert.alert('Logged in!', `Hi ${data.name}!`);
        setUserName(data.name);
        setPicURL(data.picture.data.url);
        console.log("PHOTO", data.picture.data.url);
        AsyncStorage.setItem("userName", data.name);
        AsyncStorage.setItem("userPicURL", data.picture.data.url);

        console.log("postUser");
        console.log(userName);
        axios
          .post("http://10.0.2.2:3000/user", {
            regtime: null,
            username: data.name,
            pwd: "A1",
            level: "A1",
            image: data.picture.data.url,
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

        // var userName = await AsyncStorage.getItem('userName'); ////ตัวอย่างการเรียกใช้ AsyncStorage อย้าลืม import
        // setUserName(`${(await response.json()).name}`)
        // console.log(await response.json().name)
        // console.log(" User Name")
        // console.log(userName)
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    } finally {
      goToInterest();
    }
  }
  console.log(" User Name 2");
  console.log(userName);
  console.log(picURL);

  const { control, register, handleSubmit, setValue, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  // Actions.goToInterest()

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
            placeholder="Password"
            style={styles.textInput}
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.password && (
        <Text style={styles.errorArea}>This is required.</Text>
      )}

      <View style={styles.forgotArea}>
        <Text style={styles.forgot}>FORGOT PASSWORD?</Text>
        <TouchableOpacity onPress={goToRegister}>
          <Text style={styles.forgot}>Register</Text>
        </TouchableOpacity>
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
        <View style={styles.hr} />
        <Text style={styles.title}>OR CONNECT WITH</Text>
        <View style={styles.hr} />
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
        onPressAction={logIn}
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
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center"
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
    marginBottom: 10
  },
});
