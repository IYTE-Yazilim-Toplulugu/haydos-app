import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, ImageSourcePropType, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo
import { inputStyles, colors } from '@/constants/Styles';


export interface FormInputProps {
    iconName?: React.ComponentProps<typeof Ionicons>['name'];
    icon?: ImageSourcePropType;
    pretext?: string;
    placeholder: string;
    secureTextEntry?: boolean;
    error?: string;
    value: string;
    onChangeText: (text: string) => void;
}

export const FormInput = ({ icon, iconName, placeholder, secureTextEntry = false, pretext, error, value, onChangeText }: FormInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View>
      {pretext && <Text style={inputStyles.pretext}>{pretext}</Text>}
      <View style={inputStyles.inputContainer}>
        <View style={inputStyles.iconContainer}>
          {icon && <Image source={icon} style={inputStyles.icon} />}
          {iconName && <Ionicons name={iconName} style={inputStyles.icon} />}
        </View>
        <TextInput
          style={inputStyles.input}
          placeholder={error || placeholder}
          placeholderTextColor={error ? colors.error : inputStyles.input.color}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          value={value}
          onChangeText={onChangeText}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={inputStyles.iconContainer}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              style={inputStyles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};