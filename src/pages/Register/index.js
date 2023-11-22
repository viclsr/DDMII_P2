import React, { useState } from 'react';
import {
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { styles } from "./styles"

import Slider from '@react-native-community/slider';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';

import { api } from '../../services/api';

const Register = () => {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [prepareTime, setPrepareTime] = useState(0);
  const [category, setCategory] = useState('Selecione');
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRegisterRecipe = async () => {
    const ingredientsList = ingredients.split(',');

    const hours = Math.floor(prepareTime / 60);
    const minutes = Math.floor(prepareTime % 60);

    let prepareTimeConverted = ``;

    if (hours > 0) {
      prepareTimeConverted += `${hours} hora(s)`;
    }

    if (minutes > 0) {
      prepareTimeConverted += `${minutes} minutos`;
    }

    if (hours > 0 && minutes > 0) {
      prepareTimeConverted = `${hours} hora(s) e ${minutes} minuto(s)`;
    }

    try {
      const recipe = {
        name: recipeName,
        prepTime: prepareTimeConverted,
        ingredients: ingredientsList,
        instructions: instructions,
        category: category,
        image: image,
        id: 1,
      };

      const response = await api.post('/recipes', recipe);

      if (response.status === 201) {
        Alert.alert('Receita cadastrada com sucesso!');
        setRecipeName('');
        setIngredients('');
        setInstructions('');
        setPrepareTime(0);
        setCategory('Selecione');
        setImage(null);
      } else {
        Alert.alert('Erro ao cadastrar receita. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar receita:', error);
      Alert.alert('Erro ao cadastrar receita. Por favor, tente novamente.');
    }
  };

  return (
    <SafeAreaView style={[styles.container, styles.shadowProp]}>
      <ScrollView contentContainerStyle={[styles.scrollView]}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Título da receita: </Text>
          <TextInput
            placeholder="Digite o nome da receita"
            style={styles.input}
            onChangeText={setRecipeName}
            value={recipeName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fale sobre como preparar a receita: </Text>
          <TextInput
            style={styles.inputAbout}
            multiline
            numberOfLines={4}
            value={instructions}
            onChangeText={setInstructions}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Lista de ingredientes: </Text>
          <TextInput
            placeholder="Liste os ingredientes necessários"
            style={styles.input}
            onChangeText={setIngredients}
            value={ingredients}
          />
          <Text style={styles.inputObservation}>
            Obs: separe os ingredientes por vírgula
          </Text>
        </View>

        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Categoria: </Text>
          <RNPickerSelect
            placeholder={{ label: 'Selecione' }}
            style={{
              inputIOS: styles.picker,
              inputAndroid: styles.picker,
            }}
            onValueChange={(itemValue) => setCategory(itemValue)}
            items={[
              { label: 'Salgados', value: 'salgado', key: 'salgado' },
              {
                label: 'Bolos e Tortas',
                value: 'doces e sobremesas',
                key: 'doce',
              },
              { label: 'Carnes', value: 'carne', key: 'carne' },
              { label: 'Peixes e Frutos do Mar', value: 'peixe', key: 'peixe' },
            ]}
          />
        </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.label}>Tempo de preparo:</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={300}
            onValueChange={(selectedValue) => setPrepareTime(selectedValue)}
            value={prepareTime}
            minimumTrackTintColor="#ff6961"
            thumbTintColor="#ff6961"
          />
          <Text style={styles.time}>{prepareTime.toFixed(0) + ' min'}</Text>
        </View>

        <TouchableOpacity onPress={pickImage} style={styles.selectImage}>
          <Text style={styles.textSelectImage}>Selecione uma imagem</Text>
        </TouchableOpacity>
        {image && (
          <View style={styles.recipeImageContainer}>
            <Image source={{ uri: image }} style={styles.recipeImage} />
          </View>
        )}

        <TouchableOpacity
          onPress={handleRegisterRecipe}
          style={styles.createRecipe}>
          <Text style={styles.textCreateRecipe}>CADASTRAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;
