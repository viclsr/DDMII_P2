import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollView: {
    paddingTop: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 2,
    borderColor: '#222',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    margin: 5,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 10,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    color: '#ff6961',
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
  inputObservation: {
    alignSelf: 'flex-start',
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
    paddingLeft: 10,
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
    marginVertical: 10,
  },
  slider: {
    width: 300,
  },
  time: {
    fontSize: 16,
    textAlign: 'center',
  },
  selectImage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#222',
  },
  textSelectImage: {
    color: '#ff6961',
    fontWeight: 'bold',
  },
  recipeImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  recipeImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#222',
  },
  primaryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ff6961',
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  primaryButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  confirmDeleteModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    gap: 16,
    padding: 40,
  },
  confirmDeleteModalText: {
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 20,
    flexDirection: 'row',
  },
  buttonDelete: {
    padding: 5,
    backgroundColor: '#ff6961',
    borderRadius: 3,
  },
});