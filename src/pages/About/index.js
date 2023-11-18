import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


export default function About() {
 return (
   <View style={styles.container}>
   <View style={[styles.cardContainer, styles.shadowProp]}>
     <Image source={require('../../../assets/food1.jpg')} style={styles.imagem}/>
     <Text style={styles.introductionText}><Text style={styles.strong}>Bem-vindo</Text> à nossa comunidade de apaixonados por culinária! Aqui, os usuários são a alma do nosso aplicativo</Text>
     </View>
   </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  introductionText: {
    textAlign: 'center',
    marginVertical: 20, 
    alignSelf: 'center',
    padding: 20
  },
   imagem: {
     resizeMode: 'cover',
     width: '200%',
  height: 180
  },
  strong: {
    color: '#ff6961',
    fontWeight: 'bold',
  },
  cardContainer: {
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'white',
    margin: 5,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});