import React from 'react';

import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';



const Options  = () => {
  const navigation = useNavigation();

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  const handlePress = () => {
    // Lógica para cadastrar a receita
    console.log('Receita cadastrada!');
    // Adicione a lógica de cadastro de receita conforme necessário
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Definindo o botão TouchableOpacity */}
      <TouchableOpacity style={styles.createRecipe} onPress={() => goToRegister()}>
        {/* Texto do botão */}
        <Text style={styles.textCreateRecipe}>Cadastrar Receita</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  createRecipe:{
    right: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#ff6961',
    borderRadius: 15,
    width: 150,
    marginVertical: 10,
    marginHorizontal: 5
  },
  textCreateRecipe:{
    color: '#FFF',
    fontWeight: 'bold',
  }
});

export default Options;