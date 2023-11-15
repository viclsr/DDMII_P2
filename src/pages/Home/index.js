import React, { useEffect, useState } from 'react';

import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import CardComponent from '../../components/CardComponent';
import { useNavigation } from '@react-navigation/native';

import { api } from '../../services/api';

const Home  = () => {
  const [recipes, setRecipes] = useState([]);

  const storeFavoriteRecipes = async (recipe) => {
    try {
      const storedRecipes = await AsyncStorage.getItem('@favorite_recipes');
      let favoriteItems = storedRecipes ? JSON.parse(storedRecipes) : [];

      // verificando se a receita está favoritada no Async Storage
      const isRecipeFavorited = favoriteItems.some(
        (item) => item.name === recipe.name
      );

      if (isRecipeFavorited) {
        // Remove a receita se já estiver favoritada
        favoriteItems = favoriteItems.filter(
          (item) => item.name !== recipe.name
        );
      } else {
        // Adiciona a receita se ainda não estiver favoritada
        favoriteItems.push(recipe);
      }

      await AsyncStorage.setItem('@favorite_recipes', JSON.stringify(favoriteItems));
    } catch (error) {
      console.error('Erro ao favoritar receita:', error);
    }
  };

  const navigation = useNavigation();

  const goToRecipe = (recipe) => {
    navigation.navigate('Recipe', { recipe });
  };

  useEffect(() => {
    async function getRecipes() {
      const response = await api.get('/recipes');
      setRecipes(response.data)
    }

    getRecipes()
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollView]}>
        {recipes.map((recipe, index) => (
          <TouchableOpacity key={index} onPress={() => goToRecipe(recipe)}>
            <CardComponent
              recipe={recipe}
              storeFavoriteRecipes={() => storeFavoriteRecipes(recipe)}
              isToggleShown={true}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingTop: 10,
  },
});

export default Home;
