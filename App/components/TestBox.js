import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SectionList,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import ButtonClick from "../components/ButtonClick";

const TestBox = (props) => {
  const array = [];
  const { quizs } = props;
  console.log(quizs);
  console.log(quizs.length);
  var data = quizs.map(function (item) {
    return {
      title: item.question,
      key:item.question_id,
      data: [{}],
    };
  });
  console.log(data);

  const renderSection = ({ item }) => {
    return (
      <View style={styles.whiteCardChoice}>
        {/* <View style={{ width: Dimensions.get("window").width / 1.35 }}>
          <FlatList
           title={item.question}
            data={item.list}
            numColumns={2}
            renderItem={renderListItem}
            keyExtractor={keyExtractor}
          />
        </View> */}
      </View>
    );
  };

  const renderSectionHeader = ({ section }) => {
    return (
      <View style={styles.whiteCardQuestion}>
        <View
          style={{
            width: Dimensions.get("window").width / 1.35,
            marginLeft: "10%",
          }}
        >
          <Text style={styles.textQuestion}>{section.title}</Text>
        </View>
      </View>
    );
  };

  const renderListItem = ({ item }) => {
    return (
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
    );
  };

  const keyExtractor = (item) => {
    return item.choice;
  };

  // render()
  return (
    <SectionList
      sections={data}
      contentContainerStyle={{ alignItems: "center", marginVertical: "7%" }}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderSection}
    />
  );
};
export default TestBox;

const styles = StyleSheet.create({
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
