import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { styles } from "./styles";

export default function About() {
  return (
    <View style={styles.container}>
      <View style={[styles.cardContainer, styles.shadowProp]}>
        <Image
          source={require("../../../assets/food1.jpg")}
          style={styles.imagem}
        />
        <Text style={styles.introductionText}>
          <Text style={styles.strong}>Bem-vindo</Text>
          <Text>
            {" "}
            à nossa comunidade de apaixonados por culinária! Aqui, os usuários
            são a alma do nosso aplicativo
          </Text>
        </Text>
      </View>
    </View>
  );
}
