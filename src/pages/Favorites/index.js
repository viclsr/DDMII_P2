import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "./styles";

import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CardComponent from "../../components/CardComponent";

const Favorites = ({ goToRecipe }) => {
  const [favoriteItems, setFavoriteItems] = useState([]);

  const removeFavoriteRecipes = async (recipe) => {
    try {
      const storedRecipes = await AsyncStorage.getItem("@favorite_recipes");
      let updatedFavorites = storedRecipes ? JSON.parse(storedRecipes) : [];

      // removendo a receita do array
      updatedFavorites = updatedFavorites.filter(
        (item) => item.name !== recipe.name
      );

      await AsyncStorage.setItem(
        "@favorite_recipes",
        JSON.stringify(updatedFavorites)
      );
      setFavoriteItems(updatedFavorites);
    } catch (error) {
      console.error("Erro ao remover dos favoritos:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const loadRecipes = async () => {
        try {
          const storedRecipes = await AsyncStorage.getItem("@favorite_recipes");
          if (storedRecipes) {
            setFavoriteItems(JSON.parse(storedRecipes));
          }
        } catch (error) {
          console.error("Error loading recipes:", error);
        }
      };

      loadRecipes();
    }, [])
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {favoriteItems && favoriteItems.length > 0 ? (
        favoriteItems.map((recipe, index) => (
          <TouchableOpacity key={index} onPress={() => goToRecipe(recipe)}>
            <CardComponent
              recipe={recipe}
              isToggleShown={true}
              isAlreadyFavorite={true}
              storeFavoriteRecipes={() => removeFavoriteRecipes(recipe)}
            />
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.notFoundContainer}>
          <Text>Nenhum item favorito encontrado.</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Favorites;
