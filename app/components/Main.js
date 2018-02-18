import React, { Component } from 'react';
import { 
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Note from './Note';
import Modal from 'react-native-modal';
import CreateNoteObj from '../utils/createNoteObj';
import UuidCreate from '../utils/uuidCreate';
import PersistData from '../utils/persistData';

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      noteArray: [],
      selectedNote: '',
      noteText: ''
    }
  }

  componentWillMount() {
    // Request existing notes
    AsyncStorage.getItem('notes').then((res) => {
      console.log("AsyncStorage 'get' response:", JSON.parse(res));
      // If there are notes, update the state
      if (res !== null) {
        this.setState.noteArray = JSON.parse(res);
      } 
    });
  }

  render() {

    let notes = this.state.noteArray.map((val, key) => {
      return (
        <Note 
          key={key} 
          keyVal={key} 
          val={val} 
          updateMethod={() => this.updateNote(key)} 
          deleteMethod={() => this.deleteNote(key)} />)
    });

    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>- TO DO -</Text>
        </View>
        
        <ScrollView style={styles.scrollContainer}>
        {notes}
        </ScrollView>
        
        {/* <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity 
              onPress={this.updateNote} 
              style={styles.modalOpen}>
              <Text>Hide me!</Text>
            </TouchableOpacity>
          </View>
        </Modal> */}

        <View style={styles.footer}>
            <TextInput 
            style={styles.textInput} 
            onChangeText={(noteText) => this.setState({noteText})}
            value={this.state.noteText}
            placeholder='>Note' 
            placeholderTextColor='white'
            underlineColorAndroid='transparent'>
            </TextInput>
        </View>
      
        <TouchableOpacity onPress={this.displayNoteAndSendToSaveNoteFunction.bind(this)} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

      </View>
    );
  }

  displayNoteAndSendToSaveNoteFunction() {
    if (this.state.noteText) {

      // Create a unique note id
      let noteId = UuidCreate.getNewUuid();

      // Create a note object with the text and a new date instance
      let note = CreateNoteObj.getNoteObj(noteId, this.state.noteText);
      
      // Push the note into the state noteArray to render to scrollView component
      this.state.noteArray.push(note);

      // Save the note to local storage
      PersistData.saveToLocalStorage(this.state.noteArray);

      // Update the state of the noteArray and empty the note textinput 
      this.setState({noteArray: this.state.noteArray});
      this.setState({noteText: ''});
    }
  }

  deleteNote(ind) {
    this.state.noteArray.splice(ind, 1);
    this.setState({noteArray: this.state.noteArray});
  }

  updateNote(ind) {
    console.log(this.state.noteArray[ind]);
    this.setState({ 
      // isModalVisible: !this.state.isModalVisible,
      selectedNote: this.state.noteArray[ind]
    });
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
      backgroundColor: '#44b3ce',
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: 10,
      borderBottomColor: '#ddd'
  },
  headerText: {
      color: 'white',
      fontSize: 18,
      padding: 26,
      fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed'
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#44b3ce',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
  },
  addButtonText: {
    color: 'white',
    fontSize: 24
  },
  modalOpen: {
    backgroundColor: 'pink'
  }
})
