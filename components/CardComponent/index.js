import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const CardComponent = ({ recipe }) => {
  return (
    <View style={[styles.cardContainer, styles.shadowProp]}>
      <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
      <View style={styles.textContainer}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
      </View>{' '}
      <Text style={styles.prepTime}>{recipe.prepTime}</Text>
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
    shadowOffset: {width: -2, height: 4},
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
  prepTime: {
    backgroundColor: '#DA7A6A', 
    borderRadius: 9999,
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 8,
    marginLeft: 8,
    padding: 8,
    position: 'absolute',
    top: 0,
    color: '#F3F3F5',
    textTransform: 'uppercase',
  },
});

export default CardComponent;
