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
      backgroundColor: '#4D9F56',
      borderRadius: 25, // Adjust this value to match the roundness of the button
      overflow: 'hidden',
      height: 32,
      width: '40%', // Adjust the width as needed
      alignSelf: 'center',
      marginVertical: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3, // for Android shadow
    },
    button: {
      //backgroundColor: '#4D9F56',
      paddingVertical: 4,
      paddingHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white', // Dark purple color for text
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
      backgroundColor: '#404040',
      borderRadius: 25,
      borderWidth: 1,
      borderColor: '#404040',
      height: 50,
      width: '70%',
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginBottom: 5,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: 'white',
      height: '100%',
      paddingVertical: 0,
    },
    iconContainer: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    icon: {
      fontSize: 16,
      width: 20,
      height: 20,
      color: 'white',
    },
    pretext: {
      color: colors.text,
      fontSize: 14,
      alignSelf: 'center',
    },
  });
export const formBodyStyles = StyleSheet.create({
  
  formBody: {
    paddingTop: 20,
    paddingBottom: 30,
    flexGrow: 1,
    justifyContent: 'center',
  },
  errorLabel: {
    color: colors.error,
    fontSize: 14,
    alignSelf: 'center',
  }
});
export const mapstyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#EAECE2',
  },
  contentContainer: {
    flex: 1, // This will make it take up all available space
  },
  blackContainer: {
    flex: 1, // This will make it expand to fill the contentContainer
    backgroundColor: '#404040',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: 'hidden',
    paddingBottom: 5,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: 'hidden',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  volunteerButtonsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  volunteerButtonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
    height: 34,
    width: 179,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  locationButtonsContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  locationButtonContainer: {
    borderRadius: 20,
    width: '45%', // Adjust as needed
    height: 30,
    backgroundColor: "#404040",
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedingDoneButton: {
    borderRadius: 25,
    width: '80%',
    height: 45,
    backgroundColor: "#4D9F56",
    alignSelf: 'center',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


