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
import SaveNote from '../utils/saveNote';
import DeleteNote from '../utils/deleteNote';
import mainStyles from '../styles/mainView';

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      noteArray: [],
      selectedNote: [],
      noteText: ''
    }
  }

  componentWillMount() {
    // Request existing notes
    AsyncStorage.getItem('notes').then((res) => {
      // If there are notes, update the state
      if (res !== null) {
        this.setState({noteArray: JSON.parse(res)});
      } 
    });
  }

  render() {

    let notes = this.state.noteArray.map((val, key) => {
      return (
        <Note
          key={key} 
          id={val.id} 
          keyVal={key} 
          val={val} 
          updateMethod={() => this.updateNote(key)} 
          deleteMethod={() => this.deleteNote(val.id)} />)
    });

    return (
      <View style={mainStyles.container}>
        <View style={mainStyles.header}>
            <Text style={mainStyles.headerText}>- TO DO -</Text>
        </View>
        
        <ScrollView style={mainStyles.scrollContainer}>
        {notes}
        </ScrollView>
        
        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity 
              onPress={this.updateNote} 
              style={mainStyles.modalOpen}>
              <Text>Hide me!</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={mainStyles.footer}>
            <TextInput 
            style={mainStyles.textInput} 
            onChangeText={(noteText) => this.setState({noteText})}
            value={this.state.noteText}
            placeholder='>Note' 
            placeholderTextColor='white'
            underlineColorAndroid='transparent'>
            </TextInput>
        </View>
      
        <TouchableOpacity onPress={this.displayNoteAndSendToSaveNoteFunction.bind(this)} style={mainStyles.addButton}>
          <Text style={mainStyles.addButtonText}>+</Text>
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
      
      // Push the note into the state noteArray 
      this.state.noteArray.push(note);

      // Save the note to local storage
      SaveNote.saveNoteToLocalStorage(this.state.noteArray)
        .then(() => {
          AsyncStorage.getItem('notes')
          .then((res) => {
            // Update the state of the noteArray and empty the note textinput 
            this.setState({noteArray: JSON.parse(res)});
            this.setState({noteText: ''});            
          })
        })
    }
  }

  async deleteNote(id) {
    // AsyncStorage.clear();
    let res = await DeleteNote.deleteNoteFromLocalStorage(id);
    this.setState({noteArray: JSON.parse(res)});
  }

  updateNote(ind) {
    console.log(this.state.noteArray[ind]);
    // this.setState({ 
    //   isModalVisible: !this.state.isModalVisible,
    //   selectedNote: this.state.noteArray[ind]
    // });
  }  
}