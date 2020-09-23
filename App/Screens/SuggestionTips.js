import { Actions } from "react-native-router-flux";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from "react-native";
import ReadingApi from "../API/ReadingAPI";
import Constants from "expo-constants";
import Header from "../components/Header";
import { LinearGradient } from "expo-linear-gradient";
import VocabCateApi from "../API/VocabCateAPI";

import SuggestionCard from "../components/SuggestionCard";

const home = (props) => {
  const [suggestion, setSuggestion] = useState([]);

  const getSuggestion = async () => {
    const data = await axios
      .get("http://10.0.2.2:3000/answer/suggestions/1")
      .then((response) => {
        console.log("Suggestion");
        // console.log(response.data.length);
        console.log(response.data.answer);
        console.log("Suggestion");

        setSuggestion(response.data.answer);
      });
  };

  useEffect(() => {
    // getSuggestion();
  }, []);

  const [isCheck, setCheck] = useState(new Map());

  const onCheck = React.useCallback(
    async (suggestion) => {
      const newSelected = new Map(isCheck);
      newSelected.set(suggestion, !isCheck.get(suggestion));
      setBookMark(newSelected);
      if (!isCheck.get(suggestion) == true) {
        var bookmark = []
      }

      if (!isCheck.get(suggestion) == false) {
        console.log(suggestion)
        await axios
          .delete("http://10.0.2.2:3000/wordCol/del/" + suggestion)
          //เปลี่ยนตรงนี้
          .then(
            (response) => {
              console.log("delete suggestion success!!!");
            },
            (error) => {
              console.log(error);
            }
          );
      }
    },
    [isCheck],
    // console.log(getWord),
    // console.log(isBookMark),
  );

  function ContentDefault() {
    return (
      <View style={styles.ContentSwitch}>
        <Text style={styles.topic}>Suggestion</Text>
        <FlatList
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          data={suggestion}
          renderItem={({ item }) => (
            <SuggestionCard
              isCheck={!!isCheck.get(item.suggestion)}
              onCheck={onCheck}
              suggestion={item.suggestion}
            />
          )}
        />
      </View>
    );
  }

  function ContentChange() {
    return (
      <View>
        <View style={styles.ContentSwitch}>
          <Text style={styles.topic}>Tips</Text>
          <FlatList
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center", marginTop: 25 }}
            data={trick}
            renderItem={({ item }) => (
              <LinearGradient
                colors={["#FFD387", "#FFA26B"]}
                style={{
                  left: 0,
                  right: 0,
                  top: 0,
                  height: 90,
                  width: 350,
                  borderRadius: 5,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity>
                  {/* //onPress={()=>} */}
                  <Text style={{fontFamily: "Noto-Reg", fontSize: 20}}>{item.trick_title}</Text>
                </TouchableOpacity>
              </LinearGradient>
            )}
          />
        </View>
      </View>
    );
  }

  const tabSwitch = [{ title: "Suggestion" }, { title: "Tips" }];
  if (suggestion) {
    return (
      <View style={styles.container}>
        <Header
          tabs={tabSwitch}
          ContentDefault={ContentDefault()}
          ContentChange={ContentChange()}
          suggestion={suggestion}
          isSwitch={true}
        />
      </View>
    );
  } else {
    return <Text>Loading</Text>;
  }
};
export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  gridView: {
    // marginTop: 200,
    flex: 1,
  },
  itemContainer: {
    borderRadius: 5,
    height: 110,
    width: 110,
    overflow: "hidden",
  },
  topic: {
    fontSize: 18,
    color: "#000",
    fontFamily: "PT-Bold",
  },
  itemTopic: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  ContentSwitch: {
    flex: 1,
    padding: "5%",
  },
});
