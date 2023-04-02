import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

/** 
 * @description This is the main navigation component. It contains all the screens that are available in the app.
 */
const AppStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home_Tab" component={TabNavigator} />
      </Stack.Navigator>
  )
}

export default AppStack