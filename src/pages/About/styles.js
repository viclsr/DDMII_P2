import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
