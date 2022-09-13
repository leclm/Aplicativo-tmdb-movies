import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationRef } from "./RootNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InitialScreen from "./src/screens/InitialScreen";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import CadastroScreen from "./src/screens/CadastroScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
import SaveScreen from "./src/screens/SaveScreen";
import LogoutScreen from "./src/screens/LogoutScreen";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AlertsProvider } from "react-native-paper-alerts";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Start() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "ios-home";
          } else if (route.name === "Meus filmes") {
            iconName = "ios-folder-open";
          } else if (route.name === "Sair") {
            iconName = "ios-log-out";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6bada0",
        tabBarInactiveTintColor: "gray",
      })}
    >
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
      <Tab.Screen
        name="Sair"
        component={LogoutScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function App() {
  
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={DefaultTheme}>
        <AlertsProvider>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
              <Stack.Screen name="Initial" component={InitialScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Cadastro" component={CadastroScreen} />
              <Stack.Screen name="Start" component={Start} options={{ headerShown: false }} />
              <Stack.Screen name="Detalhes do filme:" component={DetailsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AlertsProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

export default App;
