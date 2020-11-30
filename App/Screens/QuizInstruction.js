import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import Constants from "expo-constants";
import ButtonClick from "../components/ButtonClick";
import * as firebase from "firebase";

const QuizInstruction = (props) => {
  const [user, setUser] = useState([]);

  const [index, setIndex] = useState("1");
  
  function goToTestQuizReading(readingId) {
    Actions.TestQuizReading({ text: readingId });

   }
  const [readPretest, setReadPretest] = useState([]);
  const fetchUser = async () => { 
    var check = false;
   var myInterval = setInterval(async () => {
      var uuid = firebase.auth().currentUser.uid;
      if (firebase.auth().currentUser.uid == null) {
        Actions.QuizInstruction()
      }
      var response = await axios.get("https://readalright-backend.khanysorn.me/user/" + uuid);
      setUser(response.data.user)
      if (response.data.user[0].isTested == "true") {
        Actions.Home() 
      } else {
  
      }
      check = true;
      if(check==true){
        clearInterval(myInterval)
      }

    }, 2000);

  } 
  const setUp = async () => {
    await fetchUser()

  }
  useEffect(() => {
    setUp();
  }, []);
  return (

    <View style={styles.background}>
      <Text style={styles.header}>Pre-Test Instruction</Text>
      <View style={styles.whiteCardChoice}>
        <View style={styles.whiteCardArea}>
          <Text style={styles.questionText}>
            Read all 6 articles, ranging from Levels A1 - B1 and answer 18 True (T) or False (F) statements.
            When you click the next button, you can't go back to read it.
                </Text>
        </View>
      </View>
      <ButtonClick
        onPressAction={() => {
          goToTestQuizReading(1);
        }
        }
        text="Ready"
        fontSize={24}
        fontFamily="PT-Bold"
        fontcolor="#000000"
        height={39}
        width={245}
        radius={30}
        padding={0}
        colorsStart="#2DC897"
        colorsEnd="#7EF192"
      />
    </View>

  );
};

export default QuizInstruction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#F07590",
    height: "100%",
    minHeight: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center"
  },
  questionText: {
    fontSize: 16,
    alignSelf: "center",
    fontFamily: "PT-Bold",
  },
  header: {
    fontSize: 24,
    fontFamily: "PT-Bold",
    marginTop: "5%",
    alignSelf: "center",
  },
  subHeader: {
    marginTop: "2%",
    fontSize: 16,
    fontFamily: "PT-Reg",
    padding: 20,
  },
  whiteCardChoice: {
    alignSelf: "center",
    width: Dimensions.get("window").width / 1.15,
    borderRadius: 0,
    backgroundColor: "#ffffff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
    marginBottom: "10%",
    marginTop: "3%",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  whiteCardArea: {
    // flexGrow: 1,
  },
  choiceButton: {
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
  },
});
