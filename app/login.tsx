import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import { router } from 'expo-router'
import Appbar from '@/components/Appbar'
import { FormBody, FormBodyProps } from '@/components/FormBody'
import { validateForm, required, isEmail } from '@/utils/formvalidation'
import { loginRequest } from '@/service/userServices'

const login = () => {
	const [loginData, setloginData] = useState({
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
		const newErrors = validateForm(loginData, validationRules);
		setErrors(newErrors as { email: string; password: string; });

		if (Object.keys(newErrors).length === 0) {
			// Form is valid, proceed with login
			const response = loginRequest(loginData);
			console.log('Login button pressed');
			console.log('Email:', loginData.email);
			console.log('Password:', loginData.password);
			if(response.status === 200){
				console.log('Login successful');
				router.push('./home');
			} else {
				setErrorlabel("login failed");
			}
		} else {
			console.log('loginUser: Form is not valid');
			if(Object.values(loginData).some(value => value.trim() !== '')){
				setErrorlabel(Object.values(newErrors)[0] || '');
			}
		}
    };

	const handleInputChange = (field: keyof typeof loginData) => (value: string) => {
		setloginData(prev => ({ ...prev, [field]: value }));
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
				value: loginData.email,
				onChangeText: handleInputChange('email'),
				error: errors.email,
			},
			{
				iconName: 'lock-closed',
				placeholder: '********',
				pretext: 'Password',
				secureTextEntry: true,
				value: loginData.password,
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
      	<ScrollView 
      	  contentContainerStyle={{ flexGrow: 1 }}
      	  style={{ flex: 1, backgroundColor: '#EAECE2' }}
		  keyboardShouldPersistTaps="handled"
      	>
      	  <FormBody {...formBodyProps}/>
      	  <Appbar backButton={true}/>
      	</ScrollView>
	)
}

export default login