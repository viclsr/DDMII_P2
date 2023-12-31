import React, { useState, useEffect } from 'react';

import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import Icon from 'react-native-vector-icons/Ionicons';

const CardComponent = ({ recipe, onEdit, onDelete, storeFavoriteRecipes, isToggleShown, isAlreadyFavorite }) => {
  const isFocused = useIsFocused();
  const [isFavorite, setIsFavorite] = useState(isAlreadyFavorite || false);

  const checkIsFavorite = async () => {
    try {
      const storedRecipes = await AsyncStorage.getItem('@favorite_recipes');
      const favoriteItems = storedRecipes ? JSON.parse(storedRecipes) : [];
      const isRecipeFavorited = favoriteItems.some((item) => item.name === recipe.name);

      setIsFavorite(isRecipeFavorited);
    } catch (error) {
      console.error('Erro ao checar receitas favoritas:', error);
    }
  };

  useEffect(() => {
    checkIsFavorite();
  }, [isFocused, recipe.name]);

  const toggleFavorite = async () => {
    setIsFavorite(!isFavorite);
    
    storeFavoriteRecipes();
  };

  return (
    <View style={[styles.cardContainer, styles.shadowProp]}>
      <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
      <View style={styles.cardInfoContainer}>
        <View>
          <Text style={styles.recipeName}>{recipe.recipeName ?? recipe.name}</Text>
          <Text style={styles.prepTime}>{recipe.prepTime}</Text>
        </View>
        <View style={styles.cardActions}>
          <TouchableOpacity style={styles.cardAction} onPress={onEdit}>
            <Icon name="pencil" size={25} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardAction} onPress={onDelete}>
            <Icon name="trash" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {
        isToggleShown ? 
        <TouchableOpacity onPress={toggleFavorite} style={styles.favorite}>
        {isFavorite ? (
          <Icon name="ios-heart" size={30} color="red" />
        ) : (
          <Icon name="ios-heart-outline" size={30} color="white" />
        )}
      </TouchableOpacity> : null
      }
    </View>

  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'white',
    margin: 5,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  recipeImage: {
    height: 200,
    resizeMode: 'cover',
  },
  cardInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 15,
  },
  cardAction: {
    padding: 5,
    backgroundColor: "#ff6961",
    borderRadius: 3
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  favorite: {
    fontWeight: '700',
    fontSize: 12,
    position: 'absolute',
    left: 5,
    top: 5,
    color: 'white',
  },
});

export default CardComponent;