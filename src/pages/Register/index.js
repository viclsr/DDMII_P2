import React, { useState } from "react";
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
} from "react-native";

import Slider from "@react-native-community/slider";
import RNPickerSelect from "react-native-picker-select";
import * as ImagePicker from "expo-image-picker";

import { api } from "../../services/api";

const Register = () => {
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [prepareTime, setPrepareTime] = useState(0);
  const [category, setCategory] = useState("Selecione");
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
    const ingredientsList = ingredients.split(",");

    const hours = Math.floor(prepareTime / 60);
    const minutes = Math.floor(prepareTime % 60);

    // Formata as hours e minutes como uma string
    let prepareTimeConverted = ``;

    if (hours > 0) {
      prepareTimeConverted += `${hours} hora(s)`;
    }

    if (minutes > 0) {
      prepareTimeConverted += `${minutes} minuto(s)`;
    }

    if (hours > 0 && minutes > 0) {
      prepareTimeConverted += `${hours} hora(s) e ${minutes} minuto(s)`;
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

      console.log("response: ", recipe);

      const response = await api.post("/recipes", recipe);

      if (response.status === 201) {
        Alert.alert("Receita cadastrada com sucesso!");
      } else {
        Alert.alert("Erro ao cadastrar receita. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar receita:", error);
      Alert.alert("Erro ao cadastrar receita. Por favor, tente novamente.");
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
            placeholder={{ label: "Selecione" }}
            style={{
              inputIOS: styles.picker,
              inputAndroid: styles.picker,
            }}
            onValueChange={(itemValue) => setCategory(itemValue)}
            items={[
              { label: "Salgados", value: "salgado", key: "salgado" },
              {
                label: "Bolos e Tortas",
                value: "doces e sobremesas",
                key: "doce",
              },
              { label: "Carnes", value: "carne", key: "carne" },
              { label: "Peixes e Frutos do Mar", value: "peixe", key: "peixe" },
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
          <Text style={styles.time}>{prepareTime.toFixed(0) + " min"}</Text>
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
          style={styles.createRecipe}
        >
          <Text style={styles.textCreateRecipe}>CADASTRAR</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 4,
    overflow: "hidden",
    position: "relative",
    margin: 5,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  input: {
    height: 45,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#222",
    fontSize: 18,
  },
  inputAbout: {
    height: 70,
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#222",
    fontSize: 18,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    alignSelf: "flex-start",
    color: "#ff6961",
  },
  inputObservation: {
    alignSelf: "flex-start",
  },
  pickerContainer: {
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  picker: {
    width: "100%",
    height: 45,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#222",
    borderRadius: 10,
  },
  sliderContainer: {
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  slider: {
    width: 300,
  },
  time: {
    fontSize: 16,
    textAlign: "center",
  },
  selectImage: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#222",
  },
  textSelectImage: {
    color: "#ff6961",
    fontWeight: "bold",
  },
  recipeImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  recipeImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#222",
  },
  createRecipe: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ff6961",
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  textCreateRecipe: {
    color: "#FFF",
    fontWeight: "bold",
  },
  scrollView: {
    paddingTop: 10,
  },
});

export default Register;