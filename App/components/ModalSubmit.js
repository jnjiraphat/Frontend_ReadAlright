import React, { useState } from "react";
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ButtonClick from "./ButtonClick";

const ModalSubmit = (props) => {
  const {
    modalText,
    modalHeader,
    modalButton,
    modalAction,
    modalVisible
  } = props;
  return (
    <View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <LinearGradient
              colors={["#7EB2F0", "#8A63E5"]}
              style={styles.modalView}
            >
              <Text style={styles.header}>{modalHeader}</Text>
              <LinearGradient
                colors={["#FFD387", "#FCDE58"]}
                style={styles.circleLayout}
              >
                <Text style={styles.modalText}>{modalText}</Text>
              </LinearGradient>
              <ButtonClick
                text={modalButton}
                fontSize={16}
                fontcolor="#000000"
                fontFamily="PT-Bold"
                height={39}
                width={120}
                radius={30}
                padding={0}
                marginBottom="20%"
                onPressAction={modalAction}
                colorsStart="#FFD387"
                colorsEnd="#FCDE58"
              />
            </LinearGradient>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default ModalSubmit;

const styles = StyleSheet.create({
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
  modalText: {
    fontSize: 90,
    fontFamily: "PT-Bold",
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
  header: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "PT-Bold",
  },
  suggestionArea : {
    
  }
});
