import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function About() {
 return (
   <View style={styles.container}>
     <Text style={styles.introductionText}>Bem-vindo à nossa comunidade de apaixonados por culinária! Aqui, os usuários são a alma do nosso aplicativo</Text>
   </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  introductionText: {
    textAlign: 'center'
  },
  scrollView: {
    paddingTop: 50,
  },
});
