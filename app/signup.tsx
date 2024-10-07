import { View,  KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Appbar from '@/components/Appbar'
import { FormBody } from '@/components/FormBody'
import { router } from 'expo-router'
import { FormBodyProps } from '@/components/FormBody'
import { validateForm, required, isEmail } from '@/utils/formvalidation'
import { signupRequest } from '@/service/userServices'

const SignupScrean = () => {

  const [signupData, setsignupData] = useState({
    phoneNumber: '',
    name: '',
    email: '',
    password: '',
  });


  const validationRules = {
    phoneNumber: [required('Phone Number')],
    name: [required('Name')],
    email: [required('Email'), isEmail],
    password: [required('Password')],
  };


  const [errors, setErrors] = useState({
    phoneNumber: '',
    name: '',
    email: '',
    password: '',
  });

  const [errorlabel, setErrorlabel] = useState('')

  const handleInputChange = (field: keyof typeof signupData) => (value: string) => {
		setsignupData(prev => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: '' }));
		}
	};

  const handleSignUp = () => {
		const newErrors = validateForm(signupData, validationRules);
		setErrors(newErrors as { phoneNumber: string; name: string; email: string; password: string; });

		if (Object.keys(newErrors).length === 0) {
			// Form is valid, proceed with login
      console.log('Sign up button pressed')
      console.log('Phone Number:', signupData.phoneNumber)
      console.log('Name:', signupData.name)
      console.log('Email:', signupData.email)
      console.log('Password:', signupData.password)
      const response = signupRequest(signupData)
      if(response.status === 200){
        router.push('./login');
      } else {
        console.log('SignupUser: Form is not valid');
        //once the services are ready, change the error label to the actual error message
        setErrorlabel("signup failed")
      }
		} else {
			console.log('SignupUser: Form is not valid');
      if(Object.values(signupData).some(value => value.trim() !== '')){
        setErrorlabel(Object.values(newErrors)[0] || '');
      }
    }
  };

  const formBodyProps : FormBodyProps = {
    inputs: [
      {
      iconName: 'phone-portrait',
      placeholder: '05000000000',
      pretext: 'Phone Number',
      secureTextEntry: false,
      value: signupData.phoneNumber,
      onChangeText: handleInputChange('phoneNumber'),
      error: errors.phoneNumber,
    },
    {
      iconName: 'person',
      placeholder: 'John Doe',
      pretext: 'Your Name & Lastname',
      secureTextEntry: false,
      value: signupData.name,
      onChangeText: handleInputChange('name'),
      error: errors.name,
    },
    {
      iconName: 'mail',
      placeholder: '@std.iyte.edu.tr',
      pretext: 'Your Mail',
      secureTextEntry: false,
      value: signupData.email,
      onChangeText: handleInputChange('email'),
      error: errors.email,
    },
    {
      iconName: 'lock-closed',
      placeholder: '********',
      pretext: 'Password',
      secureTextEntry: true,
      value: signupData.password,
      onChangeText: handleInputChange('password'),
      error: errors.password,
    },
  ],
  buttons: [  
    {
      text: 'SIGN UP',
      onPress: handleSignUp,
    }
  ],
  errorLabel: errorlabel
};

  return (
    <View>
      <Text>Signup</Text>
      <Link href="/" style={styles.link}>
        <ThemedText type="link">Go Back</ThemedText>
      </Link>
    </View>
  )
}

const styles = StyleSheet.create({
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});

export default Signup