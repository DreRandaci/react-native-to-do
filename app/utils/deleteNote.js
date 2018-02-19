import {Alert, AsyncStorage} from 'react-native';

const deleteNote = {
    deleteNoteFromLocalStorage: async (noteId) => {
        try {
            // AsyncStorage.clear();
            const notes = await AsyncStorage.getItem('notes');
            notes = JSON.parse(notes);
            let newNoteArr = notes.splice(notes.findIndex(n => n.id === noteId), 1);
            AsyncStorage.setItem('notes', JSON.stringify(newNoteArr));
            return newNoteArr;
        } catch (err) {
            Alert.alert("Something went wrong deleting your note. Please try reloading the application if the issue continues");
            console.log("error in deleteNoteFromLocalStorage:", err);
        }
    }
}

export default deleteNote;