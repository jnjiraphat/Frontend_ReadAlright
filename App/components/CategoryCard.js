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

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Text,
  Button,
  Alert,
  Image
} from "react-native";
import { Card } from "@ant-design/react-native";
import GradientButton from "react-native-gradient-buttons";
import Constants from "expo-constants";

const DATA = [
  {
    category_id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
    img: require("./../assets/catagory/Animal.jpg")
  },
  {
    category_id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
    img: require("./../assets/catagory/Food.jpg")
  },
  {
    category_id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
    img: require("./../assets/catagory/News.jpg")
  },
  {
    category_id: "bd7acbea-c1b1-46c2-aed5-3ad53abb23ba",
    title: "First Item",
    img: require("./../assets/catagory/Animal.jpg")
  },
  {
    category_id: "3ac68afc-c605-48d3-a4f8-fbd91aa97s63",
    title: "Second Item",
    img: require("./../assets/catagory/Food.jpg")
  },
  {
    category_id: "58694a0f-3da1-471f-bd96-145571e29d722",
    title: "Third Item",
    img: require("./../assets/catagory/News.jpg")
  },
  {
    category_id: "bd7acbea-c1b1-46c2-aed5-3ad53ayb28ba",
    title: "First Item",
    img: require("./../assets/catagory/Animal.jpg")
  },
  {
    category_id: "3ac68afc-c605-48d3-a4f8-fbd91aac7f63",
    title: "Second Item",
    img: require("./../assets/catagory/Food.jpg")
  }
];

function Item({ category_id, title, selected, onSelect, img }) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(category_id)}
      style={[
        styles.item,
        {
          borderColor: selected ? "#7EF192" : "transparent"
        }
      ]}
    >
      <Card style={styles.card}>
        <Card.Body style={styles.cardImg}>
          <Image
            source={img}
            style={{
              width: 90,
              height: 90,
              borderTopRightRadius: 3,
              borderTopLeftRadius: 3
            }}
          />
        </Card.Body>
        <Card.Body style={styles.cardTitle}>
          <Text style={styles.title}>{title}</Text>
        </Card.Body>
      </Card>
    </TouchableOpacity>
  );
}

export default function App() {
  const [selected, setSelected] = React.useState(new Map());
  const [categoryId, setCategoryId] = useState(0);

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
        numColumns={3}
        data={DATA}
        renderItem={({ item }) => (
          <Item
            // topic={item.title}
            category_id={item.category_id}
            title={item.title}
            img={item.img}
            selected={!!selected.get(item.category_id)}
            onSelect={onSelect}
          />
        )}
        keyExtractor={item => item.category_id}
        extraData={selected}
      />
      <GradientButton
        style={{ marginTop: 30 }}
        text="Next"
        textStyle={{ fontSize: 20, color: "#000000" }}
        gradientDirection="vertical"
        gradientBegin="#7EF192"
        gradientEnd="#2DC897"
        height={39}
        width={245}
        radius={30}
        impact
        impactStyle="Light"
        onPressAction={() => alert("You pressed me!")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    alignItems: "center"
  },
  item: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 5,
    marginHorizontal: 8,
    marginVertical: 10
  },
  title: {
    fontSize: 10,
    paddingLeft: 5
  },
  cardImg: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    paddingTop: 0
  },
  cardTitle: {
    height: 20,
    width: 90
  },
  card: {
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowColor: "#000000",
    shadowOpacity: 0.25,
    elevation: 4
  }
});
