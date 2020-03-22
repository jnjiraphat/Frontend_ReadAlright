// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Interest from './Screens/InterestScreen';

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Interest" component={Interest} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

// import 'react-native-gesture-handler';
// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import Interest from "./Screens/InterestScreen";
// import { NavigationContainer } from '@react-navigation/native';
// // import { createStackNavigator } from '@react-navigation/stack';

// export default function App() {
//   return (
//     <NavigationContainer>{/* Rest of your app code */}</NavigationContainer>
//   );
// }
// // const Stack = createStackNavigator();
// // <NavigationContainer>
// //   <Stack.Navigator initialRouteName="Interest">
// //     <Stack.Screen name="Interest" component={Interest} />
// //     <Stack.Screen name="Details" component={DetailsScreen} />
// //   </Stack.Navigator>
// // </NavigationContainer>

// // export default function App() {
// //   return <Interest />;
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#fff",
// //     alignItems: "center",
// //     justifyContent: "center"
// //   }
// // });
