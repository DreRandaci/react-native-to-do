import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Touchable
 } from 'react-native';
import NoteModal from './NoteModal';

export default class Note extends React.Component {
  render() {
    return (

      <View key={this.props.keyVal} style={styles.note}>
      
        <TouchableOpacity onPress={this.props.updateMethod} style={styles.noteWrapper}>
        <NoteModal />
            <Text style={styles.noteText}>{this.props.val.note}</Text>
            <Text style={styles.noteText}>{this.props.val.date}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
            <Text style={styles.noteDeleteText}>D</Text>
        </TouchableOpacity>

      </View>

    );
  }
}

const styles = StyleSheet.create({
    note: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed'
    },
    noteText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#e91e63'
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff0000',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    noteDeleteText: {
        color: 'white'
    }
});

