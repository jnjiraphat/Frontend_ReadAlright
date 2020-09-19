import React, { useEffect, useState, useCallback }  from "react";
import { StyleSheet, ScrollView, Text, View, Dimensions, FlatList} from "react-native";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import Constants from "expo-constants";
import ButtonClick from "../components/ButtonClick";
import { set } from "react-native-reanimated";


const TestQuizReading = (props) => {

  // const[readId , setReadId] = useState("")
  console.log("--------------------------------")
  console.log(props.text)

  const[index , setIndex] = useState("1");
  // console.log("This is index")
  // console.log(index)

  function goToTestQuiz(readingId) {
    console.log(readingId);
    Actions.TestQuiz({ text: readingId });

    console.log("hello");
  }
  const [readPretest, setReadPretest] = useState([]);

  const fetch = async () => {
    // var index = 1;
    // var dataArrayQuiz = [];
    if (props.text != null) {
      console.log("$$$$$$$$$$$$$$$$$$$$$$")
      console.log(props.text)
          await axios         
            .get(             
              "http://10.0.2.2:3000/ReadingPre/" + props.text
            )
            .then(
              (response) => {
                console.log("prop not null")
                console.log(response.data.quiz);
                setReadPretest(response.data.quiz);
                // setIndex(props.text)
                // dataArrayQuiz.push(response.data.quiz);
                // console.log(dataArrayQuiz.length);

              },
              (error) => {
                console.log(error);
              }
            );
    }else{
      await axios
      .get(
        "http://10.0.2.2:3000/ReadingPre/" + index
      )
      .then(
        (response) => {
          console.log("prop null")
          console.log(response.data.quiz);
          setReadPretest(response.data.quiz)
          setIndex(props.text)
          // dataArrayQuiz.push(response.data.quiz);
          // console.log(dataArrayQuiz.length);
          
        },
        (error) => {
          console.log(error);
        }
        );
      }
      
    
    // var dataArrayQuiz = [];
    // for (let index = 1; index < 7; index++) {
    //   await axios
    //     .get(
    //       "http://10.0.2.2:3000/ReadingPre/" + index
    //     )
    //     .then(
    //       (response) => {
    //         console.log(response.data.quiz);
    //         dataArrayQuiz.push(response.data.quiz);
    //         console.log(dataArrayQuiz.length);
    //       },
    //       (error) => {
    //         console.log(error);
    //       }
    //     );
    // }
    // setReadPretest(dataArrayQuiz)
  };

  console.log("This is Read Pretest")
  console.log(readPretest)

  const read = async () => {
    const data = await fetch();
  };
  useEffect(() => {
    read();
  }, []);
  return (
    <View style={styles.background}>
      <Text style={styles.header}>Pre-Test</Text>
      <Text style={styles.subHeader}>
        Read the headline. Guess if a-c below are true (T) or false (F).
      </Text>
      {/* <View style={styles.whiteCardChoice}> */}
        <FlatList
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          data={readPretest}
          renderItem={({ item }) => (
            <View style={styles.whiteCardChoice}>   
              <Text style = {styles.questionText}>{item.content}</Text>           
            </View>
          )}
        />          
      {/* </View> */}

      <ButtonClick
        onPressAction={() => {if(props.text != null) {
          goToTestQuiz(props.text)
        } else {
          goToTestQuiz(1)
        }}
          }
        text="Ready"
        fontSize={24}
        fontFamily="PT-Bold"
        fontcolor="#000000"
        height={39}
        width={245}
        radius={30}
        padding={0}
        marginTop={15}
        marginBottom={115}
        // shadowRadius={30}
        colorsStart="#2DC897"
        colorsEnd="#7EF192"
      // contentId = {item.reading_id}
      />
    </View>
  );
};

export default TestQuizReading;

const styles = StyleSheet.create({
  container: {
    minWidth: "70%",
    maxWidth: "90%",
    alignItems: "stretch",
    justifyContent: "center",

    elevation: 20,
    borderRadius: 10,
    flex: 1,
  },
  answersContainer: {
    width: "90%",
    maxHeight: "20%",
    marginTop: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: "white",
    elevation: 20,
    borderRadius: 10,
  },
  surveyContainer: {
    width: "auto",
    alignSelf: "center",
    backgroundColor: "white",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    alignContent: "center",
    padding: 5,
    flexGrow: 0,
  },
  selectionGroupContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    alignContent: "flex-end",
  },
  background: {
    flex: 1,
    minHeight: 800,
    maxHeight: 800,
    // justifyContent: 'center',
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#FFD686",
  },
  questionText: {
    marginBottom: 20,
    fontSize: 16,
    alignSelf: "center",
    fontFamily: "PT-Bold",
  },
  header: {
    fontSize: 24,
    fontFamily: "PT-Bold",
    marginTop: "5%",
  },
  subHeader: {
    marginTop: "2%",
    fontSize: 16,
    fontFamily: "PT-Reg",
    padding: 20,
  },
  whiteCardChoice: {
    width: Dimensions.get("window").width / 1.15,
    borderRadius: 0,
    backgroundColor: "#ffffff",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
    // marginVertical: "10%",
    paddingVertical: 20,
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
  choiceBgSelected: {
    backgroundColor: "#FFC258",
  },
  choiceBgUnSelect: {
    backgroundColor: "#E68BEC",
  },
  buttonFlow: {
    backgroundColor: "#FFD686",
  },
  buttonFlowEnable: {
    backgroundColor: "#44E05F",
  },
  choiceText: {
    fontFamily: "PT-Bold",
    color: "#fff",
  },
  buttonFlowText: {
    fontFamily: "PT-Bold",
    color: "#fff",
  },
});
