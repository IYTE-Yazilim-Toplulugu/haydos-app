import React, { useState } from 'react'
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import { router } from 'expo-router'
import Appbar from '@/components/Appbar'
import { FormBody, FormBodyProps } from '@/components/FormBody'
import { validateForm, required, isEmail } from '@/utils/formvalidation'

const login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});

  const[errorlabel, setErrorlabel] = useState('')

	const validationRules = {
		email: [required('Email'), isEmail],
		password: [required('Password')],
	};

	const handleLogin = () => {
		const newErrors = validateForm(formData, validationRules);
		setErrors(newErrors as { email: string; password: string; });

		if (Object.keys(newErrors).length === 0) {
			// Form is valid, proceed with login
			console.log('Login button pressed');
			console.log('Email:', formData.email);
			console.log('Password:', formData.password);
			router.push('./signup');
		} else {
			console.log('loginUser: Form is not valid');
      if(Object.values(formData).some(value => value.trim() !== '')){
        setErrorlabel(Object.values(newErrors)[0] || '');
      }
    }
	};

	const handleInputChange = (field: keyof typeof formData) => (value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors(prev => ({ ...prev, [field]: '' }));
		}
	};

	const formBodyProps: FormBodyProps = {
		inputs: [
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
				text: 'LOG IN',
				onPress: handleLogin,
			}
		],
    errorLabel: errorlabel,
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

export default login