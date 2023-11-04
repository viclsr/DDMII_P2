import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import Home from './src/pages/Home';
import Recipe from './src/pages/Recipe';
import Favorites from './src/pages/Favorites';

const Tab = createBottomTabNavigator();

const icons = {
  Home: {
    name: 'ios-restaurant',
  },
  Recipe: {
    name: 'ios-restaurant',
  },
  Favorites: {
    name: 'ios-heart',
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
      <Tab.Screen
        name="Home"
        options={{ tabBarLabel: 'Receitas' }}
      >
        {() => (
          <Home
            favoriteItems={favoriteItems}
            setFavoriteItems={setFavoriteItems}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Recipe"
        component={Recipe}
        options={{
          tabBarLabel: 'Receita',
          tabBarButton: (props) => (
            <></> 
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        options={{ tabBarLabel: 'Favoritos' }}
      >
        {() => (
          <Favorites
            favoriteItems={favoriteItems}
            setFavoriteItems={setFavoriteItems}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [favoriteItems, setFavoriteItems] = useState([]);

  return (
    <NavigationContainer>
      <Tabs favoriteItems={favoriteItems} setFavoriteItems={setFavoriteItems} />
    </NavigationContainer>
  );
}