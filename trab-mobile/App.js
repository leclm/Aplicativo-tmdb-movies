import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InitialScreen from "./src/screens/InitialScreen";
import HomeScreen from "./src/screens/HomeScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import SaveScreen from "./src/screens/SaveScreen";
import { navigationRef } from "./RootNavigation";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Start() {
  return (
    <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      <Tab.Screen
          name="Meus filmes"
          component={SaveScreen}
          options={{ headerShown: false }}
        />

    </Tab.Navigator>
  );
}


function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
      <Stack.Screen
          name="Initial"
          component={InitialScreen}
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
