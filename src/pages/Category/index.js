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
    navigation.navigate('Home', { recipe });
  };

  const categories = [
    {
      name: 'Bolos e tortas',
      image:
        'https://www.sabornamesa.com.br/media/k2/items/cache/ae490490adff4f695d8831b6d20b97cf_XL.jpg',
    },
    {
      name: 'Carnes',
      image:
        'https://www.sabornamesa.com.br/media/k2/items/cache/c86ae9bf9d69e790910600aa8bced4fe_XL.jpg',
    },
    {
      name: 'Peixes e Frutos do Mar',
      image: 'https://www.sabornamesa.com.br/media/k2/items/cache/957f68251a4c401eb034febbf0fc418f_XL.jpg',
    },
    {
      name: 'Doces e Sobremesas',
      image:
        'https://www.sabornamesa.com.br/media/k2/items/cache/1a1c7a0ba8794f499343f3710b15a9ab_XL.jpg',
    },
    {
      name: 'Bebidas',
      image: 'https://www.sabornamesa.com.br/media/k2/items/cache/88431b5dd05b1e90847e42adef0f6769_XL.jpg',
    },
  ];

  return (
    <ScrollView contentContainerStyle={[styles.container, styles.scrollView]}>
      {categories.map((recipe, index) => (
        <TouchableOpacity key={index} onPress={() => goToRecipe(recipe)}>
          <CardComponent recipe={recipe} setFavoriteItems={setFavoriteItems} isToggleShown={false}/>
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
       marginTop: 640,
  },
  scrollView: {
    paddingTop: 50,
  },
});

export default Home;
