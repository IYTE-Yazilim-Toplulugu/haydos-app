import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    navigation.navigate('EmptyScreen' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.logo}
        />


      </View>
      
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNavigation}>
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>
        
        <Text style={styles.subText}>
          It would be paw'some to have you join us
        </Text>
        
        <TouchableOpacity onPress={handleNavigation}>
          <Text style={styles.signInText}>SIGN IN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.smallerButton]} 
          onPress={handleNavigation}
        >
          <Text style={styles.buttonText}>CALL VETS</Text>
        </TouchableOpacity>
      </View>
      
      <Image
        source={require('../assets/dog-outline.png')}
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
    paddingVertical: 15, // 12'den 15'e çıkarıldı
    paddingHorizontal: 30,
    borderRadius: 30, // 25'ten 30'a çıkarıldı
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: "#000", // Gölge eklendi
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  smallerButton: {
    width: '60%', // Daha küçük genişlik
    paddingVertical: 12, // 10'dan 12'ye çıkarıldı
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButtonText: {
    color: '#424242', // Gri renk
    fontSize: 20, // Daha büyük yazı boyutu
    fontWeight: 'bold',
  },
  subText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  signInText: {
    color: '#4D9F56', // Yeşil renk
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline', // Altı çizgili
    marginBottom: 10, // "CALL VETS" butonundan önce biraz boşluk
  },
  dogImage: {
    width: width * 1,  // 0.3'ten 0.5'e artırıldı
    height: width * 1, // 0.3'ten 0.5'e artırıldı
    position: 'absolute',
    bottom: 0,           // 20'den 0'a değiştirildi
    right: 0,            // 20'den 0'a değiştirildi
  },
});

export default LoginScreen;