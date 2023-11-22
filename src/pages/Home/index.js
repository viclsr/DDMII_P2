import React, { useEffect, useState } from 'react';
import { styles } from "./styles"

import {
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  Alert,
  Modal,
  View,
  Text,
  Button,
  TextInput,
  Image,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';

import CardComponent from '../../components/CardComponent';
import Icon from 'react-native-vector-icons/Ionicons';

import { api } from '../../services/api';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [confirmDeleteModalVisible, setConfirmDeleteModalVisible] =
    useState(false);

  const [editRecipeId, setEditRecipeId] = useState(null);
  const [deleteRecipeId, setDeleteRecipeId] = useState(null);

  const [editRecipeName, setEditRecipeName] = useState('');
  const [editIngredients, setEditIngredients] = useState('');
  const [editInstructions, setEditInstructions] = useState('');
  const [editPrepareTime, setEditPrepareTime] = useState(0);
  const [editCategory, setEditCategory] = useState('Selecione');
  const [editImage, setEditImage] = useState(null);

  const navigation = useNavigation();

  const goToRecipe = (recipe) => {
    navigation.navigate('Recipe', { recipe });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setEditImage(result.assets[0].uri);
    }
  };

  const storeFavoriteRecipes = async (recipe) => {
    try {
      const storedRecipes = await AsyncStorage.getItem('@favorite_recipes');
      let favoriteItems = storedRecipes ? JSON.parse(storedRecipes) : [];

      const isRecipeFavorited = favoriteItems.some(
        (item) => item.name === recipe.name
      );

      if (isRecipeFavorited) {
        favoriteItems = favoriteItems.filter(
          (item) => item.name !== recipe.name
        );
      } else {
        favoriteItems.push(recipe);
      }

      await AsyncStorage.setItem(
        '@favorite_recipes',
        JSON.stringify(favoriteItems)
      );
    } catch (error) {
      console.error('Erro ao favoritar receita:', error);
    }
  };

  async function getRecipes() {
    const response = await api.get('/recipes');
    setRecipes(response.data);
  }

  const handleEditRecipe = async () => {
    const ingredientsList = editIngredients.split(',');

    try {
      const recipe = {
        name: editRecipeName,
        prepTime: editPrepareTime,
        ingredients: ingredientsList,
        instructions: editInstructions,
        category: editCategory,
        image: editImage,
        id: editRecipeId,
      };

      const response = await api.put(`/recipes/${editRecipeId}`, recipe);

      if (response.status === 200) {
        Alert.alert('Receita editada com sucesso!');
        setEditModalVisible(false);
      } else {
        Alert.alert('Erro ao editar receita. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao editar receita:', error);
      Alert.alert('Erro ao editar receita. Por favor, tente novamente.');
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const response = await api.delete(`/recipes/${id}`);

      if (response.status === 200) {
        Alert.alert('Receita excluída com sucesso!');
        getRecipes();
      } else {
        Alert.alert('Erro ao excluir receita. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao excluir receita:', error);
      Alert.alert('Erro ao excluir receita. Por favor, tente novamente.');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getRecipes();
    setRefreshing(false);
  };

  const openEditModal = async (recipe) => {
    setEditRecipeName(recipe.name);
    setEditIngredients(recipe.ingredients.join(','));
    setEditInstructions(recipe.instructions);
    setEditPrepareTime(recipe.prepTime);
    setEditCategory(recipe.category);
    setEditImage(recipe.image);

    setEditRecipeId(recipe.id);
    setEditModalVisible(true);
  };

  const openConfirmDeleteModal = (id) => {
    setConfirmDeleteModalVisible(true);
    setDeleteRecipeId(id);
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
  };

  const closeConfirmDeleteModal = () => {
    setConfirmDeleteModalVisible(false);
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.scrollView]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <TouchableOpacity
          onPress={async () => await getRecipes()}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>ATUALIZAR</Text>
        </TouchableOpacity>
        {recipes && recipes.length > 0 ? (recipes.map((recipe, index) => (
          <TouchableOpacity key={index} onPress={() => goToRecipe(recipe)}>
            <CardComponent
              recipe={recipe}
              onEdit={() => openEditModal(recipe)}
              onDelete={() => openConfirmDeleteModal(recipe.id)}
              storeFavoriteRecipes={() => storeFavoriteRecipes(recipe)}
              isToggleShown={true}
            />
          </TouchableOpacity>
        ))) : (
          <View style={styles.notFoundContainer}>
            <Text>Nenhuma receita foi cadastrada ainda.</Text>
          </View>
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={false}
        visible={editModalVisible}
        onRequestClose={closeEditModal}>
        <SafeAreaView style={[styles.modalContainer, styles.shadowProp]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Editar Receita</Text>
            <TouchableOpacity
              onPress={closeEditModal}
              style={styles.closeButton}>
              <Icon name="close" size={35} color="#222" />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={[styles.scrollView]}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Título da receita: </Text>
              <TextInput
                placeholder="Digite o nome da receita"
                style={styles.input}
                onChangeText={setEditRecipeName}
                value={editRecipeName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Fale sobre como preparar a receita:{' '}
              </Text>
              <TextInput
                style={styles.inputAbout}
                multiline
                numberOfLines={4}
                value={editInstructions}
                onChangeText={setEditInstructions}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Lista de ingredientes: </Text>
              <TextInput
                placeholder="Liste os ingredientes necessários"
                style={styles.input}
                onChangeText={setEditIngredients}
                value={editIngredients}
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
                onValueChange={(itemValue) => setEditCategory(itemValue)}
                value={editCategory}
                items={[
                  { label: 'Salgados', value: 'salgado', key: 'salgado' },
                  {
                    label: 'Bolos e Tortas',
                    value: 'doces e sobremesas',
                    key: 'doce',
                  },
                  { label: 'Carnes', value: 'carne', key: 'carne' },
                  {
                    label: 'Peixes e Frutos do Mar',
                    value: 'peixe',
                    key: 'peixe',
                  },
                ]}
              />
            </View>

            <TouchableOpacity onPress={pickImage} style={styles.selectImage}>
              <Text style={styles.textSelectImage}>Selecione uma imagem</Text>
            </TouchableOpacity>
            {editImage && (
              <View style={styles.recipeImageContainer}>
                <Image source={{ uri: editImage }} style={styles.recipeImage} />
              </View>
            )}

            <TouchableOpacity
              onPress={handleEditRecipe}
              style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>EDITAR</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmDeleteModalVisible}
        onRequestClose={closeConfirmDeleteModal}>
        <View style={styles.confirmDeleteModal}>
          <Text style={styles.confirmDeleteModalText}>
            Você tem certeza que quer deletar esta receita?
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Sim"
              onPress={() => {
                closeConfirmDeleteModal();
                deleteRecipe(deleteRecipeId);
              }}
            />
            <Button title="Não" onPress={closeConfirmDeleteModal} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;
