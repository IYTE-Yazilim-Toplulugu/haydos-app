import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { buttonStyles, formBodyStyles } from '@/constants/Styles'
import { FormInput, FormInputProps } from '@/components/FormInput'

export interface FormBodyProps {
    inputs: FormInputProps[];
    buttons: ButtonProps[];
    errorLabel?: string;
}

export interface ButtonProps {
    text: string;
    onPress: () => void;
}

export const FormBody = (formBodyProps: FormBodyProps) => {
  return (
    <View
        style={formBodyStyles.formBody}
    >
      {formBodyProps.inputs.map((input, index) => (
        <FormInput key={index} 
        iconName={input.iconName}
        icon={input.icon}
        pretext={input.pretext}
        placeholder={input.placeholder}
        secureTextEntry={input.secureTextEntry}
        value={input.value}
        onChangeText={input.onChangeText}
        error={input.error}
         />
      ))}
      {formBodyProps.buttons.map((button, index) => (
        <TouchableOpacity key={index} onPress={button.onPress} style={buttonStyles.buttonContainer}>
            <View style={buttonStyles.button}>
                <Text style={buttonStyles.buttonText}>{button.text}</Text>
            </View>
        </TouchableOpacity>
      ))}
      {formBodyProps.errorLabel && <Text style={formBodyStyles.errorLabel}>{formBodyProps.errorLabel}</Text>}
    </View>
  )
}
