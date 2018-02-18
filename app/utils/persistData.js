import {AsyncStorage} from 'react-native';

// Saves the updated note array to local storage
const saveData = {
  saveToLocalStorage: async (notes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    } catch (err) {
      console.log("err in saveNoteToLoaclStorage:", err);
    }
  }
}

export default saveData;