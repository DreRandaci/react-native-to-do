import { StyleSheet } from "react-native";

const mainStyles = StyleSheet.create({
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
  
  export default mainStyles;