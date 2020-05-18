import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import ButtonClick from "../components/ButtonClick";
// import whiteCardStyle from "../components/WhiteCardStyle";
// import { useFonts } from "@use-expo/font";
import TestBox from "../components/TestBox";
import Test from "../API/TestAPI";
import ModalSubmit from "../components/ModalSubmit";
import ChoiceAPI from "../API/ChoiceAPI";
import axios from "axios";

const PreTest = () => {
  const [quizs, setQuiz] = useState([]);
  const dataArrayQuiz = [];

  const Question = async () => {
    for (let index = 7; index <= 16; index++) {
      await axios.get("http://10.0.2.2:3000/quiz/" + index).then(
        (response) => {
          console.log("------------------question------------------" + index);
          console.log(response.data);
          dataArrayQuiz.push(response.data);
          console.log(dataArrayQuiz.length);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    setQuiz(dataArrayQuiz);
  };

  async function getQuizAndAnswer() {
    await Question();
  }

  useEffect(() => {
    getQuizAndAnswer();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const sections = [
    {
      key: "1",
      quiz: [
        {
          question: "Question1",
        },
      ],
      data: [
        {
          choice: [
            {
              choice: "Carrot",
              choice_id: 1,
              isRightChoice: 1,
              question_id: 1,
            },
            {
              choice: "Cabbage",
              choice_id: 2,
              isRightChoice: 0,
              question_id: 1,
            },
            {
              choice: "Strawberry",
              choice_id: 3,
              isRightChoice: 0,
              question_id: 1,
            },
            {
              choice: "Blueberry",
              choice_id: 4,
              isRightChoice: 0,
              question_id: 1,
            },
          ],
        },
      ],
    },
  ];

  const quizQuestion = [];

  // let [fontsLoaded] = useFonts({
  //   // "PTSansCaption-Regular": require("../assets/font/PTSansCaption-Regular.ttf"),
  //   "PTSansCaption-Bold": require("../assets/font/PTSansCaption-Bold.ttf"),
  // });
  // if (!fontsLoaded) {
  //   return console.log("Font not load");
  // } else {

  // const renderSectionListItem = ({ item }) => {
  //   return (
  //     <FlatList
  //       data={item}
  //       numColumns={2}
  //       contentContainerStyle={{ flexDirection: "row" }}
  //       renderItem={({ item }) => (
  //         <ButtonClick
  //           // onPressAction={}
  //           colorsStart="#E9B0FF"
  //           colorsEnd="#8A63E5"
  //           // padding=
  //           radius={10}
  //           height={39}
  //           width={112}
  //           fontSize={14}
  //           // fontWeight="normal"
  //           fontcolor="#000"
  //           text={item}
  //           marginBottom={10}
  //           marginTop={10}
  //         />
  //       )}
  //     />
  //   );
  // };

  // if (quizs.length>0) {
  //   console.log(quizs.length)
  if (quizs) {
    console.log("This is quizs");

    console.log(quizs);
    return (
      <LinearGradient
        colors={["#FFB382", "#F07590"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: Dimensions.get("window").height,
          width: Dimensions.get("window").width,
        }}
      >
        <ScrollView style={styles.container}>
          <View style={{ alignItems: "center" }}>
            <View style={styles.textLayout}>
              <Text style={styles.header}>Pre-Test</Text>
              <Text style={styles.subHeader}>
                Fill the gaps with the correct word from the box.
              </Text>
            </View>
          </View>
          <TestBox section={quizs} />
          {/* <FlatList
              data={}
              extraData={}
              numColumns={2}
              contentContainerStyle={{ flexDirection: "row" }}
              renderItem={({ item, index }) => (
                <View>
                <View style={styles.whiteCardQuestion}>
        <View
          style={{
            width: Dimensions.get("window").width / 1.35,
            marginLeft: "10%",
          }}
        >
          <Text style={styles.textQuestion}>{item.title}</Text>
        </View>
      </View>
      <View style={styles.whiteCardChoice}>
      <View style={{ width: Dimensions.get("window").width / 1.35 }}>
      <ButtonClick
        // onPressAction={}
        colorsStart="#E9B0FF"
        colorsEnd="#8A63E5"
        // padding=
        radius={10}
        height={39}
        width={112}
        fontSize={14}
        fontWeight="normal"
        fontcolor="#000"
        text={item.choice}
        marginBottom={10}
        marginTop={10}
      />
      </View>
    </View>
    </View>
              )}
            /> */}

          {/* <ModalSubmit
            modalHeader="Your Level of our suggestion is"
            modalText="A1"
            modalButton="Finish"
          /> */}
        </ScrollView>
      </LinearGradient>
    );
  } else {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  // } else {
  //   return (
  //     <View>
  //       <Text>Loading</Text>
  //     </View>
  //   );
  // }

  // }
};
export default PreTest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  subHeader: {
    marginTop: "5%",
    fontSize: 16,
    fontFamily: "PT-Reg",
    // fontFamily: "PTSansCaption-Bold",
  },
  header: {
    fontSize: 24,
    fontFamily: "PT-Bold",
  },
  textLayout: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: "10%",
    width: Dimensions.get("window").width / 1.25,
  },
  whiteCard: {
    // flex: 1,
    width: Dimensions.get("window").width / 1.15,
    // justifyContent: "center",
    borderRadius: 5,
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
    marginVertical: 20,
    paddingVertical: 20,
  },
  LayoutChoice: {
    flex: 1,
    flexDirection: "row",
    width: Dimensions.get("window").width / 1.35,
  },

  // modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
  },
  modalView: {
    width: Dimensions.get("window").width / 1.35,
    // height: Dimensions.get("window").height / 2.3,
    margin: 20,
    // backgroundColor: "white",
    borderRadius: 5,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    // backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 90,
  },
  circleLayout: {
    borderRadius: 170 / 2,
    width: 170,
    height: 170,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "5%",
  },

  //quiz
  whiteCardChoice: {
    // flex: 1,
    width: Dimensions.get("window").width / 1.15,
    // justifyContent: "center",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
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
    marginBottom: "10%",
    paddingVertical: 20,
  },
  whiteCardQuestion: {
    // flex: 1,
    width: Dimensions.get("window").width / 1.15,
    justifyContent: "center",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    backgroundColor: "#ffffff",
    // alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4.65,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    elevation: 8,
    // marginBottom: 10,
    // marginVertical: 20,
    paddingVertical: 20,
  },
  textQuestion: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
