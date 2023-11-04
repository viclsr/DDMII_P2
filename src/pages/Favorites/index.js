import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import CardComponent from '../../../components/CardComponent';

const Favorites = ({ favoriteItems = [], goToRecipe }) => {
  return (
    <ScrollView>
      {favoriteItems && favoriteItems.length > 0 ? (
        favoriteItems.map((recipe, index) => (
          <TouchableOpacity key={index} onPress={() => goToRecipe(recipe)}>
            <CardComponent recipe={recipe} />
          </TouchableOpacity>
        ))
      ) : (
        <View>
          <Text>Nenhum item favorito encontrado.</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Favorites;