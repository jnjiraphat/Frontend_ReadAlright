import React, { useState } from "react";
import {
  View,
  Dimensions,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import ButtonClick from "./ButtonClick";
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ModalWord = (props) => {
  const {
    engWord,
    typeWord,
    meaning,
    exampleSentence,
    modalClose,
    modalAction,
    modalButton,
    modalVisible,
  } = props;
  // const [modalVisible, setModalVisible] = useState(false);
  return (
    
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.setCenter}>
            <View style={styles.modalView}>
              <View>
                <View style={styles.headerArea}>
                  <View>
                    <Text style={styles.headerText}>{engWord}</Text>
                    <Text style={styles.TypeWord}>({typeWord})</Text>
                  </View>
                  <View style={{flexDirection: "row"}}>
                    <Fontisto name="bookmark" size={24} color="black" style={{marginRight:10}}/>
                    <TouchableOpacity onPress={modalClose}>
                      <MaterialCommunityIcons name="close-circle-outline" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.Meaning}>{meaning}</Text>
                <View style={styles.hr}></View>
                <Text style={styles.sentence}>Example Sentence</Text>
                <Text style={styles.sentence}>{exampleSentence}</Text>
              </View>
              <View style={{alignSelf:"flex-end", marginTop: 30}}>
                <ButtonClick
                  text={modalButton}
                  fontSize={10}
                  fontcolor="#000000"
                  fontFamily="PT-Bold"
                  height={17}
                  width={86}
                  radius={30}
                  padding={0}
                  onPressAction={modalAction}
                  colorsStart="#FFD387"
                  colorsEnd="#FCDE58"
                />
              </View>
            </View>
          </View>
        </Modal>
      </View>
  );
};

export default ModalWord;

const styles = StyleSheet.create({
  // modal
  centeredView: {
    flex: 1,
  },
  setCenter: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    width: 280,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    fontSize: 90,
    fontFamily: "PT-Bold",
  },
  headerArea: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerText: {
    fontSize: 24,
    fontFamily: "PT-Bold",
  },
  TypeWord : {
    fontSize: 12,
    fontFamily: "PT-Reg"
  },
  Meaning:{
    fontFamily: "Noto-Reg",
    fontSize: 18,
    alignSelf: "center"
  },
  hr: {
    width: "100%",
    borderTopColor: "#000",
    borderTopWidth: 1,
    marginTop: 30
  },
  sentence: {
    fontFamily: "PT-Reg",
    fontSize: 16,
    marginTop: 15
  }
});
