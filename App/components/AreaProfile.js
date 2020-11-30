import React, { useState, useEffect } from "react";

import { Text, View, StyleSheet, FlatList } from "react-native";
import ButtonNoClick from "../components/ButtonNoClick";
import { AsyncStorage } from "react-native";
import * as firebase from "firebase";
import axios from "axios";


const AreaProfile = (props) => {
  const [suggestion2, setSuggestion2] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    getUserName();
    getUid();
  }, []);

  const getSuggestion = async (uUidTemp2) => {
    const data = await axios
      .get("https://readalright-backend.khanysorn.me/answer/suggestions/" + uUidTemp2)
      .then((response) => {
        setSuggestion2(response.data.answer)

      });
  };
  async function getUid() {
    try {
      var uid = firebase.auth().currentUser.uid;
      getUser(uid);
    } catch (error) {
      console.log("error getItem Area")
    }
  }
  const getUser = async (uuidTemp) => {
    try {
      await axios.get("https://readalright-backend.khanysorn.me/user/" + uuidTemp).then(
        (response) => {
          setUserId(response.data.user[0].user_id);
          getSuggestion(response.data.user[0].user_id)
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log("error get userId1")
    }
  }
  const getUserName = async () => {
    try {
      var user = await AsyncStorage.getItem('userName');
    } catch (error) {
      console.log("MyUser 3")
    } finally {
      showName(user)
    }
  }
  const [name, showName] = useState("");
  const { display, level, suggestion } = props;
  
  return suggestion2 != null ? (
    <View style={{ flexDirection: "column" }}>
      <View style={{ flexDirection: "row" }}>
        <ButtonNoClick
          colorsStart="#86B8F3"
          colorsEnd="#2DC897"
          padding={0}
          radius={5}
          height={26}
          width={51}
          fontSize={12}
          fontcolor="#000"
          text={level}
        />
        <Text
          style={{
            fontSize: 16,
            color: "#000000",
            marginLeft: "3%",
            fontFamily: "PT-Bold",
          }}
        >
          {name}
        </Text>
      </View>
      <View style={{ display: display, marginTop: "3%" }}>
        <FlatList
          data={suggestion2}
          renderItem={({ item }) => {
            return <Text style={styles.textSug}>{item.suggestion}</Text>;
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  ) : (
      <View style={{ flexDirection: "column" }}>
        <View style={{ flexDirection: "row" }}>
          <ButtonNoClick
            colorsStart="#86B8F3"
            colorsEnd="#2DC897"
            padding={0}
            radius={5}
            height={26}
            width={51}
            fontSize={12}
            fontcolor="#000"
            text={level}
          />
          <Text
            style={{
              fontSize: 16,
              color: "#000000",
              marginLeft: "3%",
              fontFamily: "PT-Bold",
            }}
          >
            {name}
          </Text>
        </View>
      </View>
    );
};

export default AreaProfile;

const styles = StyleSheet.create({
  textSug: {
    fontFamily: "PT-Reg",
    fontSize: 12,
  },
});
