import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Recipe = ({ route }) => {
  const { recipe } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
      <View style={styles.textContainer}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <Text style={styles.prepTime}>Tempo de preparo: {recipe.prepTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  recipeImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  textContainer: {
    padding: 20,
  },
  recipeName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  prepTime: {
    marginTop: 8,
    fontSize: 16,
  },
});

export default Recipe;