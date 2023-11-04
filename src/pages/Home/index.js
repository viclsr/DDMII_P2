import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import CardComponent from '../../../components/CardComponent';
import { useNavigation } from '@react-navigation/native';

const Home  = ({ favoriteItems, setFavoriteItems }) => {
  const navigation = useNavigation();

  const goToRecipe = (recipe) => {
    navigation.navigate('Recipe', { recipe });
  };

  const recipes = [
    {
      name: 'Bolo de fubá',
      prepTime: '45 minutos',
      image:
        'https://www.sabornamesa.com.br/media/k2/items/cache/1b6069f7031f5df88e14909413a02435_XL.jpg',
    },
    {
      name: 'Strogonoff de frango',
      prepTime: '45 minutos',
      image:
        'https://www.receitasonline.com.br/wp-content/uploads/Strogonoff-de-frango-simples.jpg',
    },
    {
      name: 'Bolinho de chuva',
      prepTime: '1 hora',
      image: 'https://cooknenjoy.com/wp-content/uploads/2019/05/P1180804.jpg',
    },
  ];

  return (
    <ScrollView contentContainerStyle={[styles.container, styles.scrollView]}>
      {recipes.map((recipe, index) => (
        <TouchableOpacity key={index} onPress={() => goToRecipe(recipe)}>
          <CardComponent recipe={recipe} setFavoriteItems={setFavoriteItems} />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
       marginTop: 390,
  },
  scrollView: {
    paddingTop: 50,
  },
});

export default Home;