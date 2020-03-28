// import React, { useState, useEffect, useCallback, Component } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ImageBackground,
//   StyleSheet
// } from "react-native";
// import { Card } from "react-native-elements";

// const CategoryCard = props => {
//   render(
//     <TouchableOpacity>
//       <Card
//         containerStyle={[
//           styles.itemContainer
//           // {
//           //   backgroundColor: selected ? "#6e3b6e" : "#ffffff"
//           // }
//         ]}
//       >
//         <View style={{ alignItems: "center" }}>
//           <Text style={styles.itemTopic}>{props.text}</Text>
//         </View>
//       </Card>
//     </TouchableOpacity>
//   );
// };

// export default CategoryCard;

// const styles = StyleSheet.create({
//   itemContainer: {
//     borderRadius: 5,
//     height: 110,
//     width: 110,
//     overflow: "hidden",
//     backgroundColor: "#f9c2ff"
//   },
//   itemTopic: {
//     fontSize: 14,
//     color: "#000",
//     fontWeight: "bold"
//   }
// });

import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  Button,
  Alert
} from "react-native";
import Constants from "expo-constants";

const DATA = [
  {
    category_id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item"
  },
  {
    category_id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item"
  },
  {
    category_id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item"
  }
];

function Item({ category_id, title, selected, onSelect }) {
  return (
    <TouchableOpacity
      // onPressIn={()=> setCategoryId(category_id)}
      onPress={() => onSelect(category_id)}
      style={[
        styles.item,
        { backgroundColor: selected ? "#6e3b6e" : "#f9c2ff" }
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

export default function App() {
  const [selected, setSelected] = React.useState(new Map());
  // const [categoryId, setCategoryId] = useState(0)

  const onSelect = React.useCallback(
    category_id => {
      const newSelected = new Map(selected);
      newSelected.set(category_id, !selected.get(category_id));

      setSelected(newSelected);
    },
    [selected],
    console.log(selected)
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            category_id={item.category_id}
            title={item.title}
            selected={!!selected.get(item.category_id)}
            onSelect={onSelect}
            // setCategoryId={}
          />
        )}
        keyExtractor={item => item.category_id}
        extraData={selected}
      />
      <Button
        title="Next"
        onPress={() => {
          Alert.alert();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 32
  }
});
