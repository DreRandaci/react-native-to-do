import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Touchable
 } from 'react-native';
 import Modal from "react-native-modal";
 import NoteStyles from '../styles/noteStyles';

export default class Note extends React.Component {
    
  render() {
    return (

      <View key={this.props.keyVal} style={NoteStyles.note}>
      
        <TouchableOpacity onPress={this.props.updateMethod} style={NoteStyles.noteWrapper}>
            <View>
                <Text style={NoteStyles.noteText}>{this.props.val.note}</Text>
                <Text style={NoteStyles.noteText}>{this.props.val.date}</Text>
            </View>
            
        </TouchableOpacity>

        <TouchableOpacity onPress={this.props.deleteMethod} style={NoteStyles.noteDelete}>
            <Text style={NoteStyles.noteDeleteText}>D</Text>
        </TouchableOpacity>

      </View>

    );
  }
}