import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

const Welcome = () => {
  const router = useRouter();

  const handleLogin = () => {
    console.log('Login butonuna basıldı');
    router.push('/login');
  };

  const handleSignIn = () => {
    console.log('Sign In butonuna basıldı');
    router.push('/signup');
  };

  const handleCallVets = () => {
    console.log('Call Vets butonuna basıldı');
    router.push('/vets');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/Logo.png')}
          style={styles.logo}
        />
      </View>
      
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>
        
        <Text style={styles.subText}>
          It would be paw'some to have you join us
        </Text>
        
        <TouchableOpacity onPress={handleSignIn}>
          <Text style={styles.signInText}>SIGN IN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.smallerButton]} 
          onPress={handleCallVets}
        >
          <Text style={styles.buttonText}>CALL VETS</Text>
        </TouchableOpacity>
      </View>
      
      <Image
        source={require('../assets/images/dog-outline.png')}
        style={styles.dogImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#424242',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
    marginBottom: height * 0.02,
  },
  logo: {
    width: width * 0.6,
    height: width * 0.6,
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
    marginTop: -height * 0.03,
  },
  button: {
    backgroundColor: '#4D9F56',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  smallerButton: {
    width: '60%',
    paddingVertical: 12, 
    minHeight: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButtonText: {
    color: '#424242',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  signInText: {
    color: '#4D9F56',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 10, 
  },
  dogImage: {
    width: width * 1,
    height: width * 1, 
    position: 'absolute',
    bottom: 0,           
    right: 0,            
  },
});

export default Welcome;