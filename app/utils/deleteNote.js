import { Alert, AsyncStorage } from 'react-native';

const deleteNote = {
    deleteNoteFromLocalStorage: async (noteId) => {
        try {
            let notes = await AsyncStorage.getItem('notes');
            notes = JSON.parse(notes);
            AsyncStorage.setItem('notes', JSON.stringify(notes.splice(notes.filter(n => n.id === noteId), 1)));
            
            // Returns a promise so a .then() can be used in the delete function to setState
            return notes = await AsyncStorage.getItem('notes');
        } catch (err) {
            Alert.alert("Something went wrong deleting your note. Please try reloading the application if the issue continues");
            console.log("error in deleteNoteFromLocalStorage:", err);
        }
    }
}

export default deleteNote;