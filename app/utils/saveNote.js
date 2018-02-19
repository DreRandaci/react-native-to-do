import {Alert, AsyncStorage} from 'react-native';

// Saves the updated note array to local storage
const saveNote = {
  saveNoteToLocalStorage: async (notes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    } catch (err) {
      Alert.alert("Something went wrong saving your note. Please try reloading the application if the issue continues");
      console.log("err in saveNoteToLoaclStorage:", err);
    }
  }
}

export default saveNote;