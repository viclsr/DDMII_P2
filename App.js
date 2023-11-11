import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'

import Home from './src/pages/Home';
import Recipe from './src/pages/Recipe';
import Favorites from './src/pages/Favorites';
import About from './src/pages/About';
import Category from './src/pages/Category/index'

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
  About: {
    name: 'ios-people',
  },
  Category: {
    name: 'ios-recipe',
  }
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
      <Tab.Screen
        name="About"
        options={{ tabBarLabel: 'Sobre' }}
        component={About}
      >
      </Tab.Screen>
      <Tab.Screen
        name="Category"
        options={{ tabBarLabel: 'Categoria' }}
        component={Category}
      >
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [isToggleShown, setToggleShown] = useState(true);

  return (
    <NavigationContainer>
      <Tabs favoriteItems={favoriteItems} setFavoriteItems={setFavoriteItems} />
    </NavigationContainer>
  );
}