import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator';
import RequestRideScreen from '../screens/RequestRideScreen/RequestRideScreen';
import RateUser from "../screens/RateUser";

const Stack = createNativeStackNavigator();

/** 
 * @description This is the main navigation component. It contains all the screens that are available in the app.
 */
const AppStack = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home_Tab" component={TabNavigator} />
        <Stack.Screen name="RequestRide" component={RequestRideScreen} />
        <Stack.Screen name="RateUser" component={RateUser} />
      </Stack.Navigator>
  )
}

export default AppStack