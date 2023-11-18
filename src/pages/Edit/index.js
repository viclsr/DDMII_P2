import React, { useState } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Slider from '@react-native-community/slider';
import { Picker } from '@react-native-picker/picker';

const Edit  = () => {
  const [titulo, setTitulo] = useState('');
  const [sobre, setSobre] = useState('');
  const [tempo, setTempo] = useState(0);
  const [categoria, setCategoria] = useState('Selecione');

  const editarReceita = async () => {
    try {
      const response = await fetch('https://recipe-api-production.up.railway.app/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titulo,
          category: categoria, 
          time: tempo,
        }),
      });

      if (response.ok) {
        Alert.alert('Receita cadastrada com sucesso!');
      } else {
        Alert.alert('Erro ao cadastrar receita. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar receita:', error);
      Alert.alert('Erro ao cadastrar receita. Por favor, tente novamente.');
    }
  };

    const excluirReceita = async () => {
    try {
      const response = await fetch('https://recipe-api-production.up.railway.app/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titulo,
          category: categoria, 
          time: tempo,
        }),
      });

      if (response.ok) {
        Alert.alert('Receita cadastrada com sucesso!');
      } else {
        Alert.alert('Erro ao cadastrar receita. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar receita:', error);
      Alert.alert('Erro ao cadastrar receita. Por favor, tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentContainerStyle={[styles.scrollView]}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Título da receita: </Text>
        <TextInput style={styles.input} onChangeText={setTitulo} value={titulo} />
      </View>
      <View style={styles.inputContainer}>
      <Text style={styles.label}>Fale sobre a receita: </Text>
      <TextInput
        style={styles.inputAbout}
        multiline
        numberOfLines={4}
        value={sobre}
        onChangeText={setSobre}
      />
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Categoria: </Text>
        <Picker
          selectedValue={categoria}
          onValueChange={(itemValue) => setCategoria(itemValue)}
          style={styles.picker}>
          <Picker.Item
            label="Selecione"
            value="Selecione"
          />
          <Picker.Item label="Salgados" value="salgado" />
          <Picker.Item label="Bolos e Tortas" value="doce" />
          <Picker.Item label="Carnes" value="carne" />
          <Picker.Item label="Peixes e Frutos do Mar " value="peixe" />
        </Picker>
      </View>

        <View style={styles.sliderContainer}>
          <Text style={styles.label}>Tempo de preparo:</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={300}
            onValueChange={(valorSelecionado) => setTempo(valorSelecionado)}
            value={tempo}
            minimumTrackTintColor="#ff6961"
            thumbTintColor="#ff6961"
          />
          <Text style={styles.tempo}>{tempo.toFixed(0)+" min" }</Text>
        </View>

      <TouchableOpacity onPress={editarReceita} style={styles.createRecipe}>
      <Text style={styles.textCreateRecipe}>Atualizar Receita</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={excluirReceita} style={styles.removeRecipe}>
      <Text style={styles.textRemoveRecipe}>Excluir receita</Text>
      </TouchableOpacity>
    
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    marginVertical: 20,
    marginHorizontal: 10
  },
  input: {
    height: 45,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#222',
    fontSize: 18,
  },
  inputAbout: {
    height: 70,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#222',
    fontSize: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: '#ff6961',
  },
  pickerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 10,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  picker: {
    width: '100%',
    height: 45,
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 10,
  },
  sliderContainer: {
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 10
  },
  slider: {
    width: 300,
  },
  tempo: {
    fontSize: 16,
    textAlign: 'center',
  },
  createRecipe:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#ff6961',
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 10
  },
  textCreateRecipe:{
    color: '#FFF',
    fontWeight: 'bold',
  },
  removeRecipe:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderColor: '#ff6961',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 10
  },
    textRemoveRecipe:{
    color: '#ff6961',
  },
});

export default Edit;