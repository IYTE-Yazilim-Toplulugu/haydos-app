import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import PawInformationDetailed from '../app/pawInformationDetailed'
import PawList from '../app/pawList'
import { ImageSourcePropType } from 'react-native';
 

export type RootStackParamList = {
  Home: undefined;
  Details: { pawName: string;   pawImage: ImageSourcePropType; pawGender:string; pawAge:string; pawWhereToFindMe:string; pawFunFact:string;  };
};


const Stack = createStackNavigator<RootStackParamList>();


const Index = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={PawList} />
        <Stack.Screen name="Details" component={PawInformationDetailed} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Index