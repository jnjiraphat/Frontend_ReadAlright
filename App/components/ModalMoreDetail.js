import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import ButtonClick from "./ButtonClick";
import { Fontisto } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ModalMoreDetail = (props) => {
  const {
    engWord,
    typeWord,
    meaning,
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
          <LinearGradient
              colors={["#FFD387", "#FFA26B"]}
              style={styles.modalView}
            >
              <View>
                <View style={styles.headerArea}>
                  <View>
                    <Text style={styles.headerText}>{engWord}</Text>
                  </View>
                  <View style={{flexDirection: "row"}}>
                    <TouchableOpacity onPress={modalClose}>
                      <MaterialCommunityIcons name="close-circle-outline" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={styles.Meaning}>({typeWord}) {meaning}</Text>
                <View style={styles.hr}></View>
                <Text style={styles.Meaning}>(adj.) {meaning}</Text>
                <View style={styles.hr}></View>
                <Text style={styles.Meaning}>(n.) {meaning}</Text>
                <View style={styles.hr}></View>
                {/* ส่วนนี้อาจต้องปรับเป็น card เพื่อ flatlist ความหมายออกมา */}
              </View>
            
            </LinearGradient>
          </View>
        </Modal>
      </View>
  );
};

export default ModalMoreDetail;

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
    width: 340,
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
  headerArea: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  headerText: {
    fontSize: 24,
    fontFamily: "PT-Bold",
    marginBottom: 15
  },
  Meaning:{
    fontFamily: "PT-Reg",
    fontSize: 18,
  },
  hr: {
    width: "100%",
    borderTopColor: "#000",
    borderTopWidth: 1,
    marginVertical: 10
  },
});
