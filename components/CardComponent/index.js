import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CardComponent = ({ recipe, setFavoriteItems }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    setFavoriteItems((prevItems) => {
      return isFavorite
        ? prevItems.filter((item) => item.name !== recipe.name)
        : [...prevItems, recipe];
    });
  };

  return (
    <View style={[styles.cardContainer, styles.shadowProp]}>
      <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
      <View style={styles.textContainer}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <Text style={styles.prepTime}>{recipe.prepTime}</Text>
      </View>
      <TouchableOpacity onPress={toggleFavorite} style={styles.favorite}>
        {isFavorite ? (
          <Icon name="ios-heart" size={30} color="red" />
        ) : (
          <Icon name="ios-heart-outline" size={30} color="white" />
        )}
      </TouchableOpacity>
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
  textContainer: {
    padding: 20,
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