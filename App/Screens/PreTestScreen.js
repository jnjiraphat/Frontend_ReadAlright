import React, { useEffect, useState } from "react";
import { View, ScrollView, Dimensions, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import HeaderText from "../components/HeaderText";
import ButtonClick from "../components/ButtonClick";
// import whiteCardStyle from "../components/WhiteCardStyle";
// import { useFonts } from "@use-expo/font";
import TestBox from "../components/TestBox";
import Test from "../API/TestAPI";
import ModalSubmit from "../components/ModalSubmit";
import ChoiceAPI from "../API/ChoiceAPI";
import axios from "axios";

const PreTest = () => {
  const [answer, setAnswer] = useState([]);
  const [quizs, setQuiz] = useState([]);
  const dataArrayQuiz = [];
  const dataArrayAnswer = [];
  const temp = [];
  const tempAnswer = [
    {
      question: "Question1",
      key: "1",
      data: [
        {
          key: "1",
          list: [
            {
              choice: "Carrot",
              color: "Orange",
            },
            {
              choice: "Cabbage",
              color: "Purple",
            },
            {
              choice: "Strawberry",
              color: "Red",
            },
            {
              choice: "Blueberry",
              color: "Blue",
            },
          ],
        },
      ],
    },
  ];

  const Answer = async () => {
    for (let index = 1; index <= 6; index++) {
      await axios.get("http://10.0.2.2:3000/choice/" + index).then(
        (response) => {
          temp.length = 0;
          console.log("------------------answer------------------" + index);
          console.log(response.data.choice.length);
          for (let j = 0; j < response.data.choice.length; j++) {
            temp.push(response.data.choice[j]);
            console.log(j);
          }
          dataArrayAnswer.push(temp);
          // for (let j = 0; index < response.data.choice.length; j++) {
          //   temp.push(response.data.choice[j]);
          // }
          // dataArrayAnswer.push(temp);
          // console.log("-----------------dataAnswer-------------------");

          // console.log(dataArrayAnswer);
          // console.log("------------------------------------");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };

  const Question = async () => {
    for (let index = 1; index <= 6; index++) {
      await axios.get("http://10.0.2.2:3000/quiz/" + index).then(
        (response) => {
          console.log("------------------question------------------" + index);
          dataArrayQuiz.push(response.data.quiz[0].question);
          console.log(dataArrayQuiz[index - 1]);

          console.log(dataArrayQuiz.length);

          console.log("------------------------------------");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  };
  // const Quiz = async () => {
  //   const data = await Test();
  //   setQuiz(data.quiz);
  // };

  const SetToArray = async () => {
    var data = dataArrayQuiz.map(function (item) {
      return {
        title: item,
        data: [{ list: [] }],
      };
    });

    console.log("data = ");
    console.log(data);
    console.log("eiei");
    setQuiz(data);

    // for (let index = 0; index < dataArrayAnswer.length; index++) {
    //   console.log(dataArrayAnswer[index]);
    // }

    // console.log("dataAnswerlength =" + dataArrayAnswer.length);
    // for (let index = 0; index < dataArrayQuiz.length; index++) {
    //   // tempAnswer[index].data[index].list = dataArrayAnswer[index].choice;
    //   console.log("tempAnswer" + index);
    // }

    console.log("eiei");
  };
  async function getQuizAndAnswer() {
    await Answer();
    await Question();
    await SetToArray();
    // await Quiz();
  }

  useEffect(() => {
    getQuizAndAnswer();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const sections = [
    {
      question: "Question1",
      key: "1",
      data: [
        {
          key: "1",
          list: [
            {
              choice: "Carrot",
              color: "Orange",
            },
            {
              choice: "Cabbage",
              color: "Purple",
            },
            {
              choice: "Strawberry",
              color: "Red",
            },
            {
              choice: "Blueberry",
              color: "Blue",
            },
          ],
        },
      ],
    },
    {
      question: "Question2",
      key: "2",
      data: [
        {
          key: "2",
          list: [
            {
              choice: "Apple",
              color: "Green",
            },
            {
              choice: "Banana",
              color: "Yellow",
            },
            {
              choice: "Strawberry",
              color: "Red",
            },
            {
              choice: "Blueberry",
              color: "Blue",
            },
          ],
        },
      ],
    },
  ];

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
              <HeaderText text="Pre-Test" />
              <Text style={styles.subHeader}>
                Fill the gaps with the correct word from the box.
              </Text>
            </View>
            <TestBox section={quizs} />
          </View>
          <ModalSubmit
            modalHeader="Your Level of our suggestion is"
            modalText="A1"
            modalButton="Finish"
          />
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
    // fontFamily: "PTSansCaption-Bold",
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
});
