import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TextInput,
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
import * as Google from 'expo-google-app-auth';

const Login = () => {

  const [userName, setUserName] = useState([]);
  const [picURL, setPicURL] = useState([]);
  const [uuid, setIuid] = useState("");
  var check = false;
  function goToInterest() {
    Actions.QuizInstruction();
  }
  useEffect(() => {
    if (check == true) {

    } else {
      check = true;
      checkAuth()

    }
    
  }, []);

  const checkAuth = async () => {
    var token = await AsyncStorage.getItem("token");
    var emailSign = await AsyncStorage.getItem("emailSign");
    var googleSign = await AsyncStorage.getItem("googleSign");



    if (emailSign || token || googleSign) {

      goToInterest();

    } else {
      console.log("Not Signed In------------------")

    }





  }
  function goToRegister() {
    Actions.Register();
  }

  const setUpUser = async () => {
    await this.logIn();
    await this.postUser();
  };
  function isUserEqual(googleUser, firebaseUser) {
    if (firebaseUser) {
      Actions.QuizInstruction()
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {

        if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
          return true;
        }
      }
    }
    return false;
  }
  async function setUid(uidTemp1) {
    try {
      await AsyncStorage.setItem(
        'uid',
        uidTemp1
      );
    } catch (error) {
      console.log("error setItem new user")
    }
  }
  async function setUid2(uidTemp2) {
    try {
      await AsyncStorage.setItem(
        'uid',
        uidTemp2
      );
    } catch (error) {
      console.log("error setItem not new user")
    }
  }
  async function onSignIn(googleUser) {

    var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
      unsubscribe();
      if (!isUserEqual(googleUser, firebaseUser)) {
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken);
        firebase.auth().signInWithCredential(credential).then(function (result) {

          if (result.additionalUserInfo.isNewUser) {
            setUid(result.user.uid)
            firebase.database().ref('/users/' + result.user.uid).set({
              gmail: result.user.email,
              profile_picture: result.user.photoURL,
              full_name: result.user.displayName,
              created_at: Date.now()
            }).then(function (snapshot) {


            });
            try {
              fetch('https://readalright-backend.khanysorn.me/user', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  regtime: null,
                  username: result.user.displayName,
                  pwd: "A1",
                  level: "A1",
                  image: result.user.photoURL,
                  uid: result.user.uid,
                  isTested: "false"
                }),
              }).then((response) => {
                console.log("post user success!!!");
 
              });
            } catch (error) {
              console.log("error post user")

            } finally {
              AsyncStorage.setItem("userName",result.user.displayName);
              AsyncStorage.setItem("userPicURL", result.user.photoURL);

              AsyncStorage.setItem("googleSign", result.user.uid);
              Actions.QuizInstruction()

            }

          } else {
            setUid2(result.user.uid)
            try {
              AsyncStorage.setItem("userName",result.user.displayName);
              AsyncStorage.setItem("userPicURL", result.user.photoURL);
              AsyncStorage.setItem("googleSign", result.user.uid);
            } catch (error) {
              
            }finally{
              Actions.QuizInstruction()


            }


            firebase.database().ref('/users/' + result.user.uid)({
              last_logged_in: Date.now()
            })
          }
        }).catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
        });
      } else {
        console.log('User already signed-in Firebase.');
      }
    }.bind(this));
  }
  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: "730744212125-66abd009jc25dg1p5ntbrdt8hoejjv2v.apps.googleusercontent.com",
        iosClientId: "",
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        onSignIn(result)

  
        const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${result.accessToken}` },
        });
        const data = await response.json();
      return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }
  async function logIn() {
    try {
      await Facebook.initializeAsync("791616524971373");
      const {
        type,
        token,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        const credential = firebase.auth.FacebookAuthProvider.credential(token)
        firebase.auth().signInWithCredential(credential).then((response) => {
          axios
            .post("https://readalright-backend.khanysorn.me/user", {
              regtime: null,
              username: data.name,
              pwd: "A1",
              level: "A1",
              image: data.picture.data.url,
              uid: response.user.uid,
              isTested: "false"
            })
            .then(
              (response) => {
                console.log(response);
              },
              (error) => {
                console.log(error);
              }
            );
        }).catch((error) => {
          console.log(error)
        })
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,picture`
        );
        const data = await response.json();
        console.log(data);
        var uid = data.id;
        setUserName(data.name);
        setPicURL(data.picture.data.url);
        AsyncStorage.setItem("token", token);
        AsyncStorage.setItem("userName", data.name);
        AsyncStorage.setItem("userPicURL", data.picture.data.url);

      } else {
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    } finally {
      goToInterest();
    }
  }


  const { control, register, handleSubmit, setValue, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    signInEmail(data);
  };

  async function signInEmail(data) {
    try {
      const email = data.email;
      const password = data.password;
      if (data !== null) {
        firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {

          console.log("uuid Facebook" + response.user.uid);
          axios
            .post("https://readalright-backend.khanysorn.me/user", {
              regtime: null,
              username: response.user.email,
              pwd: "A1",
              level: "A1",
              image: response.user.photoURL,
              uid: response.user.uid,
              isTested: "false"
            })
            .then(
              (response) => {
                AsyncStorage.setItem("userName",response.user.email);
                AsyncStorage.setItem("userPicURL", response.user.photoURL);
              },
              (error) => {
                console.log(error);
              }
            );

        }).catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;
        });

        AsyncStorage.setItem("emailSign", email);
      }
      console.log(email);
      console.log(password);
    } catch ({ message }) {
      alert(`SignInEmail Error: ${message}`);
    } finally {
      goToInterest();
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
            placeholder="Email"
            style={styles.textInput}
          />
        )}
        name="email"
        rules={{ required: true }}
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

      <View style={styles.forgotArea}>
        <Text style={styles.forgot}>FORGOT PASSWORD?</Text>
        <TouchableOpacity onPress={() => goToRegister()}>
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
        onPressAction={signInWithGoogleAsync}
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
