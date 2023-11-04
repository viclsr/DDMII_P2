import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from './src/pages/Home';
import About from './src/pages/About';
import Recipe from './src/pages/Recipe';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const icons = {
  Home: {
    name: 'ios-restaurant',
  },
  About: {
    name: 'ios-people',
  },
  Recipe: {
    name: 'ios-restaurant',
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
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: 'Receitas' }}
      />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Recipe" component={Recipe} options={{ title: 'Receita' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
