import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#e9ffce',
    secondary: '#333',
    tertiary: '#888',
    quaternary: '#e9ffce',
    quinary: '#333',
    senary: '#888',
    text: '#000000',
    error: '#ff0000',
}

export const buttonStyles = StyleSheet.create({
    buttonContainer: {
      backgroundColor: 'white',
      borderRadius: 25, // Adjust this value to match the roundness of the button
      overflow: 'hidden',
      width: '80%', // Adjust the width as needed
      alignSelf: 'center',
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3, // for Android shadow
    },
    button: {
      backgroundColor: 'white',
      paddingVertical: 12,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: '#755fab', // Dark purple color for text
      fontSize: 16,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    highlightOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#e9ffce', // Light green color for the highlight
      opacity: 0.5,
    },
  });
export const inputStyles = StyleSheet.create({
    inputContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#888',
      paddingHorizontal: 15,
      paddingVertical: 10,
      height: 60,
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.5,
      shadowRadius: 1.5,
      elevation: 3,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: '#333',
      marginLeft: 10,
    },
    icon: {
      width: 20,
      height: 20,
      tintColor: '#888',
    },
    passwordToggle: {
      padding: 10,
    },
    formContainer: {
      backgroundColor: '#e9ffce', // Light green background
      padding: 20,
      borderRadius: 30,
    },
  });
export const formBodyStyles = StyleSheet.create({
    formBody: {
      padding: 20,
      flex: 1,
      justifyContent: 'center',
    },
});


