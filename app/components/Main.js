import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Note from './Note';
import NoteModal from './NoteModal';

export default class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],
      noteText: ''
    }
  }

  render() {

    let notes = this.state.noteArray.map((val, key) => {
      return <Note key={key} keyVal={key} val={val} updateMethod={() => this.updateNote(key)} deleteMethod={() => this.deleteNote(key)} />
    })

    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>- TO DO -</Text>
        </View>
        
        <ScrollView style={styles.scrollContainer}>
        {notes}
        </ScrollView>
        
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
      
      <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      </View>
    );
  }

  addNote() {

    if (this.state.noteText) {
      var date = new Date();
      this.state.noteArray.push({
        'date': (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear(), 
        'note': this.state.noteText
      });
      
      this.setState({noteArray: this.state.noteArray});
      this.setState({noteText: ''});
    }
  }

  deleteNote(ind) {
    this.state.noteArray.splice(ind, 1);
    this.setState({noteArray: this.state.noteArray});
  }

  updateNote(ind) {
    // <NoteModal visible={true}/>
    let note = this.state.noteArray[ind];
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
  }
})
