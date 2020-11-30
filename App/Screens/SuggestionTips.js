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
import Constants from "expo-constants";
import Header from "../components/Header";
import { LinearGradient } from "expo-linear-gradient";

import SuggestionCard from "../components/SuggestionCard";
import LoadingScreen from './LoadingScreen'
import * as firebase from "firebase";

const suggestionTypeId = [];

const home = (props) => {
  const [isCheck, setCheck] = useState(new Map());
  const [suggestion, setSuggestion] = useState([]);

  const [userId, setUserId] = useState("");


  async function getUid() {
    try {
      console.log("get uid first in suggestion")
      var uid = firebase.auth().currentUser.uid;
      console.log(uid)
      getUser(uid);
      getAndPostSuggestion(uid);

    } catch (error) {
      console.log("error getItem")
      
    }
  }

  const getUser = async (uuidTemp) => {
    try {
      console.log("Get UuidTemp");
      console.log(uuidTemp);

      await axios.get("https://readalright-backend.khanysorn.me/user/" + uuidTemp).then(
        (response) => {
          console.log("id user");
          console.log(response.data.user);
          console.log(response.data.user[0].user_id);
          setUserId(response.data.user[0].user_id);
          getSuggestion(response.data.user[0].user_id);
        },
        (error) => {
          console.log("error in get userId")

          console.log(error);
        }
      );
    } catch (error) {
      console.log("error get userId6")
    }
  }

  const [trick, setTrick] = useState([]);
  const getAndPostSuggestion = async (uid) => {
    await getSuggestion();
    setTimeout(() => {
      postSuggestion(uid);
    }, 5000);
  }


  const getSuggestion = async (userIdTemp) => {
    console.log("userIdTemp")
    console.log(userIdTemp)
    axios.get("https://readalright-backend.khanysorn.me/answer/suggestions/" + userIdTemp).then(
      (response) => {
        console.log("SuggestionNon");
        console.log(response.data.answer);
        setSuggestion(response.data.answer);
        for (let index = 0; index < response.data.answer.length; index++) {
          suggestionTypeId.push(response.data.answer[index]);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };
  
  const getTrick = async () => {
    try {
      const data = await axios.get("https://readalright-backend.khanysorn.me/tricks").then(
        (response) => {
          setTrick(response.data.quiz)
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {

    } finally {
      
    }

  };
  const postSuggestion = async (uid) => {
  
    for (let index = 0; index < suggestionTypeId.length; index++) {
      axios
        .post("https://readalright-backend.khanysorn.me/suggestion_user", {
          typeOfSuggestion_id: suggestionTypeId[index].typeOfSuggestion_id,
          user_id: uid
        })
        .then(
          (response) => {
            console.log("post suggesttion success!!!");

          },
          (error) => {
            console.log(error);
          }
        );
    }
  };

  const onCheck = React.useCallback(
    async (suggestId) => {
      const newSelected = new Map(isCheck);
      newSelected.set(suggestId, !isCheck.get(suggestId));
      setCheck(newSelected);
      if (!isCheck.get(suggestId) == true) {
        await axios
          .delete("https://readalright-backend.khanysorn.me/suggestion_user/" + suggestId)
          .then(
            (response) => {
              console.log("delete suggestion success!!!");
            },
            (error) => {
              console.log(error);
            }
          );
      }

      if (!isCheck.get(suggestion) == false) {

      }
    },
    [isCheck],
  );

  function goToContentTip(tricks_id) {   
    Actions.ContentTip({ text: tricks_id });
  }


  
  useEffect(() => {
    getTrick();
    getUid();
  }, []);

  function ContentDefault() {
    if (suggestion) {
      return (
        <View style={styles.ContentSwitch}>
          <Text style={styles.topic}>Suggestion</Text>
          <FlatList
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center"  }}
            data={suggestion}
            renderItem={({ item }) => (
              <SuggestionCard
                suggestId={item.typeOfSuggestion_id}
                isCheck={!!isCheck.get(item.typeOfSuggestion_id)}
                onCheck={onCheck}
                suggestion={item.suggestion}
              />
            )}
            keyExtractor = { (item, index) => index.toString() }
          />
        </View>
      );
    } else (
      <View style={{ flex: 1 }}>
        <LoadingScreen />
      </View>
    )

  }

  function ContentChange() {
    if (trick) {
      return (
        <View>
          <View style={styles.ContentSwitch}>
            <Text style={styles.topic}>Tips</Text>
            <FlatList
              contentContainerStyle={{ flexGrow: 1, justifyContent: "center", marginTop: 25, marginBottom: 100, alignItems: "center" }}
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
                    // alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20
                  }}
                >
                  <TouchableOpacity style={{padding: 10}}  onPress={() => goToContentTip(item.tricks_id)
            }>                   
                    <Text style={{ fontFamily: "Noto-Reg", fontSize: 20 }}>{item.trick_title}</Text>
                  </TouchableOpacity>
                </LinearGradient>
              )}
              keyExtractor = { (item, index) => index.toString() }
            />
          </View>
        </View>
      );
    } else {
      <View style={{ flex: 1 }}>
        <LoadingScreen />
      </View>
    }

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
