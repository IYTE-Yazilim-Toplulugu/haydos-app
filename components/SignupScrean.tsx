import { View,  KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Appbar from '@/components/Appbar'
import { FormBody } from '@/components/FormBody'
import { router } from 'expo-router'
import { FormBodyProps } from '@/components/FormBody'
import { validateForm, required, isEmail } from '@/utils/formvalidation'

const SignupScrean = () => {

  const [formData, setFormData] = useState({
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

  const handleInputChange = (field: keyof typeof formData) => (value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: '' }));
		}
	};

  const handleSignUp = () => {
		const newErrors = validateForm(formData, validationRules);
		setErrors(newErrors as { phoneNumber: string; name: string; email: string; password: string; });

		if (Object.keys(newErrors).length === 0) {
			// Form is valid, proceed with login
      console.log('Sign up button pressed')
      console.log('Phone Number:', formData.phoneNumber)
      console.log('Name:', formData.name)
      console.log('Email:', formData.email)
      console.log('Password:', formData.password)
      router.push('./login');
		} else {
			console.log('SignupUser: Form is not valid');
      if(Object.values(formData).some(value => value.trim() !== '')){
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
      value: formData.phoneNumber,
      onChangeText: handleInputChange('phoneNumber'),
      error: errors.phoneNumber,
    },
    {
      iconName: 'person',
      placeholder: 'John Doe',
      pretext: 'Your Name & Lastname',
      secureTextEntry: false,
      value: formData.name,
      onChangeText: handleInputChange('name'),
      error: errors.name,
    },
    {
      iconName: 'mail',
      placeholder: '@std.iyte.edu.tr',
      pretext: 'Your Mail',
      secureTextEntry: false,
      value: formData.email,
      onChangeText: handleInputChange('email'),
      error: errors.email,
    },
    {
      iconName: 'lock-closed',
      placeholder: '********',
      pretext: 'Password',
      secureTextEntry: true,
      value: formData.password,
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
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1, backgroundColor: '#EAECE2' }}
      >
        <FormBody {...formBodyProps}/>
        <Appbar backButton={true}/>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignupScrean