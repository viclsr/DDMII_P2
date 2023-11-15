import React from 'react';

import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import CardComponent from '../../components/CardComponent';

import { categories } from '../../mocks/categories';

const Category  = () => {
  const navigation = useNavigation();

  const goToRecipe = (recipe) => {
    navigation.navigate('Home', { recipe });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {categories.map((recipe, index) => (
          <TouchableOpacity key={index} onPress={() => goToRecipe(recipe)}>
            <CardComponent recipe={recipe} isToggleShown={false}/>
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

export default Category;
