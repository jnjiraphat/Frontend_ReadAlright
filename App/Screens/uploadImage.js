import React from "react";
import { Image, StyleSheet, Button, Text, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";

const uploadImage = (props) => {
  onChooseImagePress = async () => {
    let result = await ImagePicker.launchCameraAsync();
    let fileName = result.uri;
    if (!result.cancelled) {
      this.uploadImageF(result.uri, fileName)
        .then((response) => {
          Alert.alert("Success");
        })
        .catch((error) => {
          Alert.alert(error);
        });
    }
  };

  uploadImageF = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("images/" + imageName);
    const snapshot = await ref.put(blob);

    return await snapshot.ref.getDownloadURL();
  };

  return (
    <View style={styles.container}>
      <Button title="Choose image..." onPress={this.onChooseImagePress} />
    </View>
  );
};
export default uploadImage;
const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, alignItems: "center" },
});
