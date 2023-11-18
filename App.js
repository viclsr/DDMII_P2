import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import Home from "./src/pages/Home";
import Recipe from "./src/pages/Recipe";
import Favorites from "./src/pages/Favorites";
import About from "./src/pages/About";
import Options from "./src/pages/Options/index";
import Register from "./src/pages/Register/index";
import Edit from "./src/pages/Edit/index";

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
};

function Tabs({ favoriteItems, setFavoriteItems }) {
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
        name="Options"
        options={{ tabBarLabel: "Minhas receitas" }}
        component={Options}
      ></Tab.Screen>
      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          tabBarLabel: "Cadastrar Receita",
          tabBarButton: (props) => <></>,
        }}
      />
      <Tab.Screen
        name="Edit"
        component={Edit}
        options={{
          tabBarLabel: "Editar Receita",
          tabBarButton: (props) => <></>,
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