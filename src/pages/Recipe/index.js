import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { styles } from './styles';

const Recipe = ({ route }) => {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
      <View style={styles.textContainer}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <Text style={styles.prepTime}>Categoria: {recipe.category}</Text>
        <Text style={styles.prepTime}>Tempo de preparo: {recipe.prepTime}</Text>
        <Text style={styles.prepTime}>Ingredientes: {recipe.ingredients.join(', ')}</Text>
        <Text style={styles.prepTime}>Modo de preparo: {recipe.instructions}</Text>
      </View>
    </View>
  );
};

export default Recipe;
