import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icon from "react-native-vector-icons/Ionicons";

import Home from "./src/pages/Home";
import Recipe from "./src/pages/Recipe";
import Favorites from "./src/pages/Favorites";
import About from "./src/pages/About";
import Register from "./src/pages/Register/index";

const Tab = createBottomTabNavigator();

const icons = {
  Home: {
    name: "ios-restaurant",
  },
  Recipe: {
    name: "ios-restaurant",
  },
  Favorites: {
    name: "ios-heart",
  },
  About: {
    name: "ios-people",
  },
  Options: {
    name: "ios-folder",
  },
  Register: {
    name: "ios-pencil",
  },
};

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const { name } = icons[route.name];
          return <Icon name={name} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" options={{ tabBarLabel: "Receitas" }}>
        {() => <Home />}
      </Tab.Screen>
      <Tab.Screen
        name="Recipe"
        component={Recipe}
        options={{
          tabBarLabel: "Receita",
          tabBarButton: (props) => <></>,
        }}
      />
      <Tab.Screen name="Favorites" options={{ tabBarLabel: "Favoritos" }}>
        {() => <Favorites />}
      </Tab.Screen>
      <Tab.Screen
        name="About"
        options={{ tabBarLabel: "Sobre" }}
        component={About}
      ></Tab.Screen>
      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          tabBarLabel: "Criar Receita",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
